export const getBarChartHourData = (beerData) => {
  const checkInsPerHour = {};

  // Initialize check-ins count for each hour
  for (let i = 0; i < 24; i++) {
    checkInsPerHour[String(i).padStart(2, '0') + ':00'] = {
      value: 0,
      items: [], // Initialize items array for each hour
    };
  }

  // Extract hours from beerData and count check-ins for each hour
  beerData.forEach((beer) => {
    const hour = new Date(beer.created_at).getHours();
    const hourString = String(hour).padStart(2, '0') + ':00';
    checkInsPerHour[hourString].value++;
    checkInsPerHour[hourString].items.push(beer); // Add beer name to items array
  });

  // Map check-ins count to an array of objects
  return Object.keys(checkInsPerHour).map((hourString) => ({
    name: hourString,
    ...checkInsPerHour[hourString], // Spread the count and items from checkInsPerHour
  }));
};
