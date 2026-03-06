/**
 * normaliseCheckins.js
 *
 * Converts either an Untappd Insider export or an Untappd Scraper XL export
 * into the canonical flat shape the dashboard expects.
 *
 * Canonical shape matches the Insider format, so Insider items are
 * essentially a no-op pass-through. Scraper XL items are remapped.
 */

// ---------------------------------------------------------------------------
// Format detection
// ---------------------------------------------------------------------------

/**
 * Auto-detects the export format by inspecting the first item.
 * Returns 'scraper_xl' if the item has a nested `beer` object,
 * otherwise 'insider'.
 *
 * @param {Array} data
 * @returns {'insider'|'scraper_xl'}
 */
export const detectFormat = (dataRaw) => {
  const data = Array.isArray(dataRaw?.checkins) ? dataRaw.checkins : dataRaw;
  if (!Array.isArray(data) || data.length === 0) return 'insider';
  return data[0] && typeof data[0].beer === 'object' ? 'scraper_xl' : 'insider';
};

// ---------------------------------------------------------------------------
// Scraper XL helpers
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
 * Converts an ISO 8601 UTC date string to the "YYYY-MM-DD HH:MM:SS" format
 * that the Insider export (and the rest of the app) uses.
 *
 * The Insider export stores timestamps in Europe/Amsterdam local time (CET in
 * winter, CEST in summer). We use Intl.DateTimeFormat to apply the correct
 * offset (either +1 or +2 h depending on the date) instead of a hardcoded
 * +1 h shift, which was causing dates in the CEST period to land on the wrong
 * calendar day when the check-in happened between midnight and 1 am CEST.
 */
const amsFmt = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Amsterdam',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const isoToFlat = (iso) => {
  if (!iso) return '';
  const d = new Date(iso);
  // Intl.DateTimeFormat gives us each field already in Amsterdam local time.
  const parts = Object.fromEntries(
    amsFmt.formatToParts(d).map(({ type, value }) => [type, value])
  );
  // en-CA locale formats the date as YYYY-MM-DD, so `parts.year/month/day`
  // are already zero-padded strings.
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
};

// ---------------------------------------------------------------------------
// Per-format normalisers
// ---------------------------------------------------------------------------

const normaliseInsiderItem = (item) => ({ ...item });

const normaliseScraperXlItem = (item) => {
  const beer = item.beer ?? {};
  const brewery = item.brewery ?? {};
  const venue = item.venue ?? {};
  const purchasedAt = item.purchased_at ?? {};

  return {
    checkin_id: item.checkin_id,
    checkin_url: item.checkin_url,
    created_at: isoToFlat(item.created_at),

    // Beer
    beer_name: beer.name ?? '',
    beer_type: cleanBeerStyle(beer.style),
    beer_abv: beer.abv ?? 0,
    beer_ibu: beer.ibu ?? 0,
    beer_url: beer.url ?? '',
    bid: extractIdFromUrl(beer.url),
    global_rating_score: beer.global_rating != null ? parseFloat(beer.global_rating.toFixed(2)) : null,
    global_weighted_rating_score: null, // not available in Scraper XL

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
    rating_score: item.rating ?? 0,
    comment: item.comment ?? '',
    serving_type: item.serving_type ?? '',
    photo_url: item.photo_url ?? null,
    purchase_venue: purchasedAt.name ?? '',
    purchase_venue_city: purchasedAt.city ?? '',
    purchase_venue_country: purchasedAt.country ?? '',
    purchase_venue_lat: purchasedAt.lat ?? null,
    purchase_venue_lng: purchasedAt.lng ?? null,
    flavor_profiles: Array.isArray(item.flavor) ? item.flavor.join(',') : '',
    tagged_friends: Array.isArray(item.tagged_friends)
      ? item.tagged_friends.join(', ')
      : (item.tagged_friends ?? ''),
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
 * @param {Array}                   data    Raw parsed JSON array
 * @param {'insider'|'scraper_xl'}  format  Format hint (falls back to auto-detect)
 * @returns {Array}                         Normalised array
 */
export const normaliseCheckins = (dataRaw, format) => {
  const data = Array.isArray(dataRaw?.checkins) ? dataRaw.checkins : dataRaw;
  const resolvedFormat = format ?? detectFormat(data);

  if (resolvedFormat === 'scraper_xl' || resolvedFormat === 'custom_export') {
    if (!Array.isArray(data)) return [];
    return data.map(normaliseScraperXlItem);
  }

  // 'insider' — pass through (field names already match)
  if (!Array.isArray(data)) return [];
  return data.map(normaliseInsiderItem);
};
