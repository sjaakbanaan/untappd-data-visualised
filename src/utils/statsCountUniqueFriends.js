export const statsCountUniqueFriends = (beerData, key) => {
  const uniqueSet = new Set();
  beerData.forEach((item) => {
    if (item[key]) {
      const names = item[key].split(',').map((name) => name.trim());
      names.forEach((name) => uniqueSet.add(name));
    }
  });
  return uniqueSet.size;
};
