export const getBarChartRatingData = (beerData, global = false) => {
  const ratingsPerYear = {};
  const dataType = global ? 'global_rating_score' : 'rating_score';

  beerData.forEach((beer) => {
    if (!beer[dataType] || beer[dataType] === 0) {
      // Skip entries with empty or zero rating_score
      return;
    }

    const year = new Date(beer.created_at).getFullYear().toString();
    if (!ratingsPerYear[year]) {
      ratingsPerYear[year] = { totalRating: beer[dataType], count: 1 };
    } else {
      ratingsPerYear[year].totalRating += beer[dataType];
      ratingsPerYear[year].count++;
    }
  });

  return Object.entries(ratingsPerYear).map(([year, { totalRating, count }]) => ({
    name: year,
    value: totalRating / count, // Calculate average rating
  }));
};
