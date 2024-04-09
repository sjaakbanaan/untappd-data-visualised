export const getLocalStorageData = (type) => {
  const storedUserDetails = localStorage.getItem('userDetails');
  if (storedUserDetails) {
    const storedUserDetailsJson = JSON.parse(storedUserDetails);
    return storedUserDetailsJson[type];
  }
  return null; // Return null if userDetails not found in localStorage
};
