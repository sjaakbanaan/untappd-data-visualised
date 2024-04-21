// Function to get the default end date, which is 6 months back
export const getDefaultStartDate = () => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 6);
  return currentDate.toISOString().split('T')[0];
};
