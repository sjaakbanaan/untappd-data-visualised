export const checkFullDateRange = (getDefaultEndDate, fullBeerData, filterDateRange) => {
  const uniqueDates = new Set(
    fullBeerData.map((item) => new Date(item.created_at).toISOString().slice(0, 10))
  );
  const firstCheckinDate = [...uniqueDates].sort()[0];

  const fullDateRange =
    filterDateRange?.start === firstCheckinDate &&
    filterDateRange?.end === getDefaultEndDate;

  return [fullDateRange, firstCheckinDate];
};
