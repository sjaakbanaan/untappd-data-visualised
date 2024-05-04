export const statsCountTotal = (beerData, key, predicate = (item) => item !== null) => {
  return beerData.reduce((count, item) => {
    return predicate(item[key]) ? count + 1 : count;
  }, 0);
};
