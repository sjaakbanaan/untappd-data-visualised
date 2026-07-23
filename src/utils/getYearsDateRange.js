import { getDefaultStartDate } from './getDefaultStartDate';
import { getDefaultEndDate } from './getDefaulEndDate';

// Returns the date range spanning the selected years (min year -> max year,
// capped at today). With no years selected, falls back to the default range.
export const getYearsDateRange = (years) => {
  if (!years || years.length === 0) {
    return { start: getDefaultStartDate(), end: getDefaultEndDate() };
  }

  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const endOfMaxYear = `${maxYear}-12-31`;

  return {
    start: `${minYear}-01-01`,
    end: getDefaultEndDate() < endOfMaxYear ? getDefaultEndDate() : endOfMaxYear,
  };
};
