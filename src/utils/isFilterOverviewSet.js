import { getDefaultEndDate } from './getDefaulEndDate';
import { getDefaultStartDate } from './getDefaultStartDate';

export const isFilterOverviewSet = (filterOverview, filterDateRange) => {
  for (const key in filterOverview) {
    if (!Object.hasOwnProperty.call(filterOverview, key)) continue;
    const value = filterOverview[key];
    if (Array.isArray(value) ? value.length > 0 : value !== '') {
      return true;
    }
  }
  if (
    filterDateRange.start !== getDefaultStartDate() ||
    filterDateRange.end !== getDefaultEndDate()
  ) {
    return true;
  }
  return false;
};
