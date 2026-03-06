/**
 * extractBadges.js
 *
 * Extracts badge information from an array of scraperxl checkin objects.
 *
 * Each checkin may have a `badges` array with items shaped as:
 *   { name: "Belgian Holiday (Level 41)", text: "...", image_url: "..." }
 *
 * This function:
 *  1. Collects all badges across all checkins
 *  2. For each unique badge base-name, keeps only the entry with the highest level
 *  3. Sorts the result: levelled badges descending by level, then levelless badges after
 *
 * @param  {Array} checkins  Raw scraperxl checkin objects
 * @returns {Array}          Deduplicated badge array, sorted highest level first
 */

/**
 * Parses the level number from a badge name like "Belgian Holiday (Level 41)".
 * Returns null if no level is present.
 *
 * @param  {string} name
 * @returns {{ baseName: string, level: number|null }}
 */
export const parseBadgeName = (name) => {
  const match = name?.match(/^(.*?)\s*\(Level\s+(\d+)\)\s*$/i);
  if (match) {
    return { baseName: match[1].trim(), level: parseInt(match[2], 10) };
  }
  return { baseName: name?.trim() ?? '', level: null };
};

/**
 * @param  {Array} checkins  Raw scraperxl checkin objects
 * @returns {Array}
 */
export const extractBadges = (checkins) => {
  // Map from baseName → best badge entry found so far
  const best = new Map();

  for (const checkin of checkins) {
    const badges = checkin?.badges;
    if (!Array.isArray(badges)) continue;

    for (const badge of badges) {
      if (!badge?.name) continue;
      const { baseName, level } = parseBadgeName(badge.name);

      if (!best.has(baseName)) {
        // First time we see this badge — store it
        best.set(baseName, { ...badge, baseName, level });
      } else {
        const existing = best.get(baseName);
        // Replace if this entry has a higher (or first-found) level
        if (level !== null && (existing.level === null || level > existing.level)) {
          best.set(baseName, { ...badge, baseName, level });
        }
      }
    }
  }

  // Sort: highest level first, then null-level badges alphabetically
  return Array.from(best.values()).sort((a, b) => {
    if (a.level !== null && b.level !== null) return b.level - a.level;
    if (a.level !== null) return -1;
    if (b.level !== null) return 1;
    return a.baseName.localeCompare(b.baseName);
  });
};
