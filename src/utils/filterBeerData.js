export const filterBeerData = (beerData, filterOverview, filterDateRange, resetList) => {
  // Helper function to generate filter functions dynamically
  const generateFilterFunction = (filterKey) => (item) =>
    !filterOverview[filterKey] ||
    item[filterKey]?.toLowerCase().includes(filterOverview[filterKey].toLowerCase());

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
