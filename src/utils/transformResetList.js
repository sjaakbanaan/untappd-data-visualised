export const transformResetList = (resetList, format) => {
  switch (format) {
    case 'arrays':
      return Object.keys(resetList).reduce((acc, key) => {
        acc[key] = [];
        return acc;
      }, {});

    case 'keyArrays':
      return Object.keys(resetList);

    default:
      throw new Error('Invalid format type. Use  "arrays" or "keyArrays".');
  }
};
