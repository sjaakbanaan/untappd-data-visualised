export const formatWrappdDates = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Function to add ordinal suffix
  const addOrdinalSuffix = (day) => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const value = day % 100;
    return day + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
  };

  // Get formatted parts
  const startMonth = startDate.toLocaleString('en-US', { month: 'short' });
  const startDay = addOrdinalSuffix(startDate.getDate());
  const startYear = startDate.getFullYear();

  const endMonth = endDate.toLocaleString('en-US', { month: 'short' });
  const endDay = addOrdinalSuffix(endDate.getDate());
  const endYear = endDate.getFullYear();

  // If the dates are in the same month and year
  if (startYear === endYear && startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay} ${startYear}`;
  }

  // If the dates are in the same year but different months
  if (startYear === endYear) {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay} ${startYear}`;
  }

  // If the dates span different years
  return `${startMonth} ${startDay} ${startYear} - ${endMonth} ${endDay} ${endYear}`;
};
