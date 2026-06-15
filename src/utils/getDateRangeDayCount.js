/**
 * Returns the number of calendar days in a date range (inclusive of both start and end).
 * Expects YYYY-MM-DD strings, same format as filterDateRange.
 */
export const getDateRangeDayCount = (dateRange) => {
  if (!dateRange?.start || !dateRange?.end) return null;

  const [startY, startM, startD] = dateRange.start.split('-').map(Number);
  const [endY, endM, endD] = dateRange.end.split('-').map(Number);

  const start = Date.UTC(startY, startM - 1, startD);
  const end = Date.UTC(endY, endM - 1, endD);

  return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
};
