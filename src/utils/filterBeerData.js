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
  filterFunctions.date = (item) =>
    (!filterDateRange.start ||
      new Date(item.created_at.split(' ')[0]) >= new Date(filterDateRange.start)) &&
    (!filterDateRange.end ||
      new Date(item.created_at.split(' ')[0]) <= new Date(filterDateRange.end));

  // Apply all filters
  return beerData.filter((item) =>
    Object.values(filterFunctions).every((func) => func(item))
  );
};
