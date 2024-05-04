export const checkFullDateRange = (getDefaultEndDate, beerData, filterDateRange) => {
  const uniqueDates = [
    ...new Set(
      beerData.map((item) => new Date(item.created_at).toISOString().slice(0, 10))
    ),
  ];

  const fullDateRange =
    filterDateRange?.start === `${uniqueDates[0]}` &&
    filterDateRange?.end == getDefaultEndDate;

  // return both a boolean when full range, and the the date of the first check-in ever
  return [fullDateRange, uniqueDates[0]];
};
