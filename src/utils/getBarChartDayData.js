export const getBarChartDayData = (beerData) => {
  const checkInsPerDay = {};

  // Define day names for better readability
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  beerData.forEach((beer) => {
    const dayIndex = new Date(beer.created_at).getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const dayName = daysOfWeek[dayIndex];

    if (!checkInsPerDay[dayName]) {
      checkInsPerDay[dayName] = {
        value: 1,
        items: [beer], // Initialize items array with the beer name
      };
    } else {
      checkInsPerDay[dayName].value++;
      checkInsPerDay[dayName].items.push(beer); // Add beer name to items array
    }
  });

  // Find the index of "Sunday" in the daysOfWeek array
  const sundayIndex = daysOfWeek.indexOf('Sunday');

  // Ensure that the days are in the correct order starting from Sunday
  const orderedDays = daysOfWeek
    .slice(sundayIndex)
    .concat(daysOfWeek.slice(0, sundayIndex));

  // Map the ordered days to an array of objects
  return orderedDays.map((dayName) => ({
    name: dayName,
    ...checkInsPerDay[dayName], // Spread the count and items from checkInsPerDay
  }));
};
