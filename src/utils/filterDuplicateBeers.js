export const filterDuplicateBeers = (beerData) => {
  const uniqueNames = [];
  const filteredData = [];

  beerData.forEach((item) => {
    if (!uniqueNames.includes(+item.bid)) {
      uniqueNames.push(+item.bid);
      filteredData.push(item);
    }
  });

  return filteredData;
};
