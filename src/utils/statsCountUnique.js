export const statsCountUnique = (beerData, key) => {
  const uniqueSet = new Set();
  beerData.forEach((item) => {
    if (item[key]) {
      uniqueSet.add(item[key]);
    }
  });
  return uniqueSet.size;
};
