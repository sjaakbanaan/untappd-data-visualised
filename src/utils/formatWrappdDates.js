export const formatWrappdDates = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const today = new Date();

  // Helper function to check if a date range is exactly one year
  const isFullYear = (start, end) => {
    return (
      start.getMonth() === 0 && // January
      start.getDate() === 1 && // 1st
      end.getMonth() === 11 && // December
      end.getDate() === 31 // 31st
    );
  };

  // Helper function to check if a date range is exactly 6 months
  const isLastSixMonths = (start, end) => {
    const sixMonthsAgo = new Date(today);
    sixMonthsAgo.setMonth(today.getMonth() - 6);

    // Check if the range is exactly 6 months apart
    const monthDiff =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());

    return monthDiff === 6;
  };

  // Helper function to check if a date range is exactly one year ago
  const isLastYear = (start, end) => {
    const lastYear = new Date(today.getFullYear() - 1, 0, 1);
    const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);
    return (
      start.getTime() === lastYear.getTime() && end.getTime() === lastYearEnd.getTime()
    );
  };

  // Check for special cases
  if (isFullYear(startDate, endDate)) {
    return endDate.getFullYear().toString();
  }

  if (isLastSixMonths(startDate, endDate)) {
    return 'last 6 months';
  }

  if (isLastYear(startDate, endDate)) {
    return 'last year';
  }

  // If no special cases match, use the original formatting
  const addOrdinalSuffix = (day) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const value = day % 100;
    return day + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
  };

  const startMonth = startDate.toLocaleString('en-US', { month: 'short' });
  const startDay = addOrdinalSuffix(startDate.getDate());
  const startYear = startDate.getFullYear();

  const endMonth = endDate.toLocaleString('en-US', { month: 'short' });
  const endDay = addOrdinalSuffix(endDate.getDate());
  const endYear = endDate.getFullYear();

  if (startYear === endYear && startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay} ${startYear}`;
  }

  if (startYear === endYear) {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay} ${startYear}`;
  }

  return `${startMonth} ${startDay} ${startYear} - ${endMonth} ${endDay} ${endYear}`;
};
