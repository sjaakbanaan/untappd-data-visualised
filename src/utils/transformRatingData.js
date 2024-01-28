// Function to transform beer data into name and value format
export const transformRatingData = (beerData, scoreType) => {
  return beerData.map((item) => ({
    name: `${item.beer_name}, ${item.brewery_name}`,
    value: +item[scoreType],
  }));
};
