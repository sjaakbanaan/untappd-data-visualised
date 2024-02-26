export const getBarChartMonthData = (beerData) => {
  const beersPerMonth = {};
  beerData.forEach((beer) => {
    const month = new Date(beer.created_at).toLocaleString('default', { month: 'short' });
    if (!beersPerMonth[month]) {
      beersPerMonth[month] = 1;
    } else {
      beersPerMonth[month]++;
    }
  });

  return Object.entries(beersPerMonth).map(([name, count]) => ({
    name,
    count,
  }));
};
