// Function to get the default start date
export const getDefaultStartDate = () => {
  const currentDate = new Date();
  const last30Days = new Date(currentDate);
  last30Days.setDate(currentDate.getDate() - 30);
  return last30Days.toISOString().split('T')[0];
};
