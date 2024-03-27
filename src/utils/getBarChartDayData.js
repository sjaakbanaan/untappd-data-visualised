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
      checkInsPerDay[dayName] = 1;
    } else {
      checkInsPerDay[dayName]++;
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
    value: checkInsPerDay[dayName] || 0, // Handle cases where there are no check-ins for a day
  }));
};
