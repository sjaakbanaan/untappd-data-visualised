export const checkFullDateRange = (getDefaultEndDate, beerData, filterDateRange) => {
  const uniqueDates = new Set(
    beerData.map((item) => new Date(item.created_at).toISOString().slice(0, 10))
  );
  const firstCheckinDate = [...uniqueDates][0];

  const fullDateRange =
    filterDateRange?.start === firstCheckinDate &&
    filterDateRange?.end == getDefaultEndDate;

  return [fullDateRange, firstCheckinDate];
};
