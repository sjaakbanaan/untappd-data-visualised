export const filterBeerData = (beerData, filterOverview, filterDateRange, resetList) => {
  // Helper function to generate filter functions dynamically
  const generateFilterFunction = (filterKey) => (item) => {
    if (!filterOverview[filterKey]) return true;

    const itemValue = item[filterKey]?.toString().toLowerCase();
    const filterValue = filterOverview[filterKey].toString().toLowerCase();

    if (filterKey === 'tagged_friends') {
      // For tagged_friends, check if the selected friend is in the comma-separated list
      return (
        itemValue?.split(',').some((friend) => friend.trim() === filterValue) || false
      );
    }

    return itemValue === filterValue;
  };

  // Dynamically create filter functions based on resetList keys
  const filterFunctions = Object.keys(resetList).reduce((acc, key) => {
    acc[key] = generateFilterFunction(key);
    return acc;
  }, {});

  // Add Date range filter separately
  // Use plain string comparison (YYYY-MM-DD ≥ YYYY-MM-DD) to avoid timezone
  // pitfalls: new Date("YYYY-MM-DD") always parses as UTC midnight, which
  // can shift dates by a day on non-UTC machines (e.g. CET = UTC+1).
  filterFunctions.date = (item) => {
    const itemDate = item.created_at.split(' ')[0];
    return (
      (!filterDateRange.start || itemDate >= filterDateRange.start) &&
      (!filterDateRange.end || itemDate <= filterDateRange.end)
    );
  };

  // Apply all filters
  return beerData.filter((item) =>
    Object.values(filterFunctions).every((func) => func(item))
  );
};
