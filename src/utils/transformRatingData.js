// Function to transform beer data into name and value format
export const transformRatingData = (beerData, scoreType) => {
  return beerData.map((item) => ({
    name: `${item.beer_name}, ${item.brewery_name}`,
    value: +item[scoreType],
    beer_url: item.beer_url,
    checkin_url: item.checkin_url,
    your_score: item.rating_score,
  }));
};
