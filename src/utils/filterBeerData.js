export const filterBeerData = (beerData, filterOverview, filterDateRange, resetList) => {
  // Helper function to generate filter functions dynamically.
  // Each filter holds an array of selected values (a plain string is also
  // tolerated for backwards compatibility); an item matches when its value
  // equals any of the selected values.
  const generateFilterFunction = (filterKey) => (item) => {
    const rawValue = filterOverview[filterKey];
    const filterValues = (Array.isArray(rawValue) ? rawValue : rawValue ? [rawValue] : [])
      .map((value) => value.toString().toLowerCase());
    if (filterValues.length === 0) return true;

    const itemValue = item[filterKey]?.toString().toLowerCase();

    if (filterKey === 'tagged_friends') {
      // For tagged_friends, check if any selected friend is in the comma-separated list
      const friends = itemValue?.split(',').map((friend) => friend.trim()) || [];
      return filterValues.some((filterValue) => friends.includes(filterValue));
    }

    return filterValues.includes(itemValue);
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
