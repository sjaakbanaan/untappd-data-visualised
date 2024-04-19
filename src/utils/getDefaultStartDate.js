// Function to get the default end date
export const getDefaultStartDate = () => {
  return new Date(new Date().getFullYear(), 0, 1).toLocaleDateString();
};
