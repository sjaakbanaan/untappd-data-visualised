import { getDefaultStartDate, getDefaultEndDate } from './';

export const isFilterOverviewSet = (filterOverview, filterDateRange) => {
  for (const key in filterOverview) {
    if (Object.hasOwnProperty.call(filterOverview, key) && filterOverview[key] !== '') {
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
