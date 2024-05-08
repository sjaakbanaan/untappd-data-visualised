export const getBarChartHourData = (beerData) => {
  const checkInsPerHour = {};

  // Initialize check-ins count for each hour
  for (let i = 0; i < 24; i++) {
    checkInsPerHour[String(i).padStart(2, '0') + ':00'] = 0;
  }

  // Extract hours from beerData and count check-ins for each hour
  beerData.forEach((beer) => {
    const hour = new Date(beer.created_at).getHours();
    const hourString = String(hour).padStart(2, '0') + ':00';
    checkInsPerHour[hourString]++;
  });

  // Map check-ins count to an array of objects
  return Object.keys(checkInsPerHour).map((hourString) => ({
    name: hourString,
    value: checkInsPerHour[hourString],
  }));
};
