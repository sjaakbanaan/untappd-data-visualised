export const getBarChartMonthData = (beerData, monthsSplitup = false) => {
  const beersPerMonth = {};
  beerData.forEach((beer) => {
    const date = new Date(beer.created_at);

    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    const monthYear = monthsSplitup ? `${month} ${year}` : month;

    if (!beersPerMonth[monthYear]) {
      beersPerMonth[monthYear] = 1;
    } else {
      beersPerMonth[monthYear]++;
    }
  });

  return Object.entries(beersPerMonth).map(([name, value]) => ({
    name,
    value,
  }));
};
