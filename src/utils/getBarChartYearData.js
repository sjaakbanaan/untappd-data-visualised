export const getBarChartYearData = (beerData) => {
  const beersPerYear = {};
  beerData.forEach((beer) => {
    const year = new Date(beer.created_at).toString();
    if (!beersPerYear[year]) {
      beersPerYear[year] = 1;
    } else {
      beersPerYear[year]++;
    }
  });
  return Object.entries(beersPerYear).map(([name, count]) => ({
    name,
    count,
  }));
};
