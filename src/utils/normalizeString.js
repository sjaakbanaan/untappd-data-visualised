export const normalizeString = (inputString) => {
  // Remove extra spaces around commas and split the string into an array
  const stringArray = inputString.split(/\s*,\s*/);
  // Join the array elements with a comma and space to create the normalized string
  const normalizedString = stringArray.join(', ');
  return normalizedString;
};
