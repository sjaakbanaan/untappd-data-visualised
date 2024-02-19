export const isFilterOverviewSet = (filterOverview) => {
  for (const key in filterOverview) {
    if (Object.hasOwnProperty.call(filterOverview, key) && filterOverview[key] !== '') {
      return true;
    }
  }
  return false;
};
