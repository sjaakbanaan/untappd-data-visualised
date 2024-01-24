// Function to get the default end date
export const getDefaultEndDate = () => {
  return new Date().toISOString().split('T')[0];
};
