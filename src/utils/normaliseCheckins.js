/**
 * normaliseCheckins.js
 *
 * Converts either an official Untappd Insider export or an Untappd Scraper XL
 * export (https://github.com/sjaakbanaan/untappd-scraper-xl) into the
 * canonical flat shape the dashboard expects.
 *
 * Canonical fields (used everywhere downstream):
 * - created_at: "YYYY-MM-DD HH:MM:SS"
 * - tagged_friends: comma-separated string (e.g. "Alice, Bob")
 * - flavor_profiles: comma-separated string (e.g. "sweet,fruity")
 * - rating_score: number
 *
 * Official Insider exports historically matched this shape already. Newer
 * Insider dumps still use flat field names, but ship tagged_friends /
 * flavor_profiles as arrays and created_at as ISO-8601 with an offset
 * ("2023-10-05T10:39:09+01:00"). The clock digits are the same check-in time
 * as the legacy "2023-10-05 10:39:09" value, so the offset is not applied.
 * Scraper XL uses nested beer/brewery/venue objects and UTC timestamps
 * ("...Z"), which are converted to Europe/Amsterdam wall time.
 */

// ---------------------------------------------------------------------------
// Format detection
// ---------------------------------------------------------------------------

/**
 * Auto-detects the export format by inspecting the first item.
 * Returns 'scraper_xl' if the item has a nested `beer` object,
 * otherwise 'insider'.
 *
 * @param {Array|Object} dataRaw
 * @returns {'insider'|'scraper_xl'}
 */
export const detectFormat = (dataRaw) => {
  const data = Array.isArray(dataRaw?.checkins) ? dataRaw.checkins : dataRaw;
  if (!Array.isArray(data) || data.length === 0) return 'insider';
  return data[0] && typeof data[0].beer === 'object' ? 'scraper_xl' : 'insider';
};

/**
 * Maps stored profile values (`untappd_insider` / `custom_export`) and
 * auto-detect labels (`insider` / `scraper_xl`) onto the two handlers.
 *
 * @param {string|undefined} format
 * @param {Array|Object} dataRaw
 * @returns {'insider'|'scraper_xl'}
 */
export const resolveFormat = (format, dataRaw) => {
  if (format === 'scraper_xl' || format === 'custom_export') return 'scraper_xl';
  if (format === 'insider' || format === 'untappd_insider') return 'insider';
  return detectFormat(dataRaw);
};

/**
 * Profile / Firestore value for the detected export format.
 * @param {'insider'|'scraper_xl'} format
 * @returns {'untappd_insider'|'custom_export'}
 */
export const toJsonSource = (format) =>
  format === 'scraper_xl' ? 'custom_export' : 'untappd_insider';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/**
 * Strips the leading "Homebrew, " prefix that Scraper XL sometimes prepends
 * to beer style names, e.g. "Homebrew, IPA - American" → "IPA - American".
 */
const cleanBeerStyle = (style) => {
  if (!style) return '';
  return style.replace(/^Homebrew,\s*/i, '').trim();
};

/**
 * Strips the " - City, State - Untappd" suffix that Scraper XL appends
 * to brewery names, e.g. "Spaten-… - München, Bayern - Untappd".
 */
const cleanBreweryName = (name) => {
  if (!name) return '';
  // Remove trailing " - <anything> - Untappd"
  return name.replace(/\s+-\s+.+?\s+-\s+Untappd$/, '').trim();
};

/**
 * Extracts the numeric ID from the last path segment of an Untappd URL.
 * e.g. "https://untappd.com/b/cerveja-musa-born-in-the-ipa/1400464" → 1400464
 * Returns null when not found.
 */
const extractIdFromUrl = (url) => {
  if (!url) return null;
  const match = url.match(/\/(\d+)\/?$/);
  return match ? parseInt(match[1], 10) : null;
};

/**
 * Converts a UTC ISO timestamp ("2023-10-07T14:49:21.000Z", as used by
 * Scraper XL) to "YYYY-MM-DD HH:MM:SS" in Europe/Amsterdam.
 *
 * hourCycle h23 keeps midnight as 00:00:00. Some engines format hour 00 as
 * 24 when hour12 is false, and "24:00:00" is an Invalid Date downstream.
 */
const amsFmt = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Amsterdam',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

const isoToFlat = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const parts = Object.fromEntries(
    amsFmt.formatToParts(d).map(({ type, value }) => [type, value])
  );
  if (!parts.year || !parts.month || !parts.day || parts.hour == null) return '';
  const hour = parts.hour === '24' ? '00' : parts.hour;
  return `${parts.year}-${parts.month}-${parts.day} ${hour}:${parts.minute}:${parts.second}`;
};

const CANONICAL_CREATED_AT = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

/**
 * Newer official exports: "2023-10-05T10:39:09+01:00", with an optional
 * fraction and an offset written as ±HH:MM or ±HHMM. The date and clock
 * match the legacy "2023-10-05 10:39:09" string; applying the offset would
 * move summer check-ins by an hour and can push late-evening ones onto the
 * next calendar day.
 */
const OFFSET_WALL_CLOCK =
  /^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2}:\d{2})(?:\.\d+)?[+-]\d{2}:?\d{2}$/i;

/**
 * Normalises created_at to "YYYY-MM-DD HH:MM:SS".
 * Legacy Insider timestamps are kept. Offset ISO timestamps keep their clock
 * time. UTC "Z" timestamps (Scraper XL) are converted to Amsterdam wall time.
 */
const toCanonicalCreatedAt = (value) => {
  if (value == null) return '';
  const trimmed = String(value).trim();
  if (!trimmed) return '';
  if (CANONICAL_CREATED_AT.test(trimmed)) return trimmed;

  const offsetMatch = trimmed.match(OFFSET_WALL_CLOCK);
  if (offsetMatch) return `${offsetMatch[1]} ${offsetMatch[2]}`;

  if (trimmed.includes('T') || trimmed.includes('t')) return isoToFlat(trimmed);
  return trimmed;
};

/**
 * Coerces friends / flavor lists to a comma-separated string.
 * Accepts legacy Insider strings and newer array exports.
 */
const toCommaSeparated = (value, separator = ', ') => {
  if (Array.isArray(value)) {
    return value
      .map((entry) => String(entry).trim())
      .filter(Boolean)
      .join(separator);
  }
  if (value == null) return '';
  return String(value);
};

const toRatingScore = (value) => {
  if (value === '' || value == null) return 0;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

// ---------------------------------------------------------------------------
// Official Untappd Insider export
// ---------------------------------------------------------------------------

/**
 * Flat field names already match the dashboard. Coerce the fields whose
 * shape changed in newer Insider dumps (and keep older string dumps working).
 */
const normaliseInsiderItem = (item) => ({
  ...item,
  created_at: toCanonicalCreatedAt(item.created_at),
  tagged_friends: toCommaSeparated(item.tagged_friends, ', '),
  flavor_profiles: toCommaSeparated(item.flavor_profiles, ','),
  rating_score: toRatingScore(item.rating_score),
});

// ---------------------------------------------------------------------------
// Untappd Scraper XL export
// ---------------------------------------------------------------------------

/**
 * Remaps nested Scraper XL check-ins into the canonical flat shape.
 * @see https://github.com/sjaakbanaan/untappd-scraper-xl
 */
const normaliseScraperXlItem = (item) => {
  const beer = item.beer ?? {};
  const brewery = item.brewery ?? {};
  const venue = item.venue ?? {};
  const purchasedAt = item.purchased_at ?? {};

  return {
    checkin_id: item.checkin_id,
    checkin_url: item.checkin_url,
    created_at: toCanonicalCreatedAt(item.created_at),

    // Beer
    beer_name: beer.name ?? '',
    beer_type: cleanBeerStyle(beer.style),
    beer_abv: beer.abv ?? 0,
    beer_ibu: beer.ibu ?? 0,
    beer_url: beer.url ?? '',
    bid: extractIdFromUrl(beer.url),
    global_rating_score:
      beer.global_rating != null ? parseFloat(beer.global_rating.toFixed(2)) : null,
    global_weighted_rating_score: null, // not available in Scraper XL
    global_total_checkins: beer.total_checkins ?? null,
    global_unique_users: beer.unique_users ?? null,

    // Brewery — city/country/lat/lng are now individual fields
    brewery_name: cleanBreweryName(brewery.name),
    brewery_url: brewery.url ?? '',
    brewery_id: extractIdFromUrl(brewery.url),
    brewery_city: brewery.city ?? '',
    brewery_state: brewery.state ?? '',
    brewery_country: brewery.country ?? '',
    brewery_lat: brewery.lat ?? null,
    brewery_lng: brewery.lng ?? null,

    // Venue — city/country/lat/lng are now individual fields
    venue_name: venue.name ?? '',
    venue_city: venue.city ?? '',
    venue_state: venue.state ?? '',
    venue_country: venue.country ?? '',
    venue_lat: venue.lat ?? null,
    venue_lng: venue.lng ?? null,

    // Check-in details
    rating_score: toRatingScore(item.rating),
    comment: item.comment ?? '',
    serving_type: item.serving_type ?? '',
    photo_url: item.photo_url ?? null,
    purchase_venue: purchasedAt.name ?? '',
    purchase_venue_city: purchasedAt.city ?? '',
    purchase_venue_country: purchasedAt.country ?? '',
    purchase_venue_lat: purchasedAt.lat ?? null,
    purchase_venue_lng: purchasedAt.lng ?? null,
    flavor_profiles: toCommaSeparated(item.flavor, ','),
    tagged_friends: toCommaSeparated(item.tagged_friends, ', '),
    total_toasts: item.toasts?.count ?? 0,
    total_comments: item.comment_count ?? 0,
  };
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Normalises an array of check-ins from either export format into the
 * canonical flat shape the dashboard uses.
 *
 * @param {Array|Object} dataRaw  Raw parsed JSON (array or `{ checkins: [] }`)
 * @param {string}       [format] Format hint (`insider` / `untappd_insider` /
 *                                `scraper_xl` / `custom_export`); auto-detects
 *                                when omitted or unrecognised
 * @returns {Array}
 */
export const normaliseCheckins = (dataRaw, format) => {
  const data = Array.isArray(dataRaw?.checkins) ? dataRaw.checkins : dataRaw;
  if (!Array.isArray(data)) return [];

  const resolvedFormat = resolveFormat(format, dataRaw);

  if (resolvedFormat === 'scraper_xl') {
    return data.map(normaliseScraperXlItem);
  }

  return data.map(normaliseInsiderItem);
};
