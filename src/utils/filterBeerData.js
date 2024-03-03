export const filterBeerData = (beerData, filterOverview, filterDateRange) => {
  // Helper function to generate filter functions dynamically
  const generateFilterFunction = (filterKey) => (item) =>
    !filterOverview[filterKey] ||
    item[filterKey]?.toLowerCase().includes(filterOverview[filterKey].toLowerCase());

  // Filter functions for each filter key
  const filterFunctions = {
    brewery_name: generateFilterFunction('brewery_name'),
    beer_type: generateFilterFunction('beer_type'),
    venue_country: generateFilterFunction('venue_country'),
    venue_city: generateFilterFunction('venue_city'),
    // Date range filter
    date: (item) =>
      (!filterDateRange.start ||
        new Date(item.created_at) >= new Date(filterDateRange.start)) &&
      (!filterDateRange.end ||
        new Date(item.created_at) <= new Date(filterDateRange.end)),
  };

  // Apply filters whenever filterOverview or filterDateRange changes
  return beerData.filter((item) =>
    Object.values(filterFunctions).every((func) => func(item))
  );
};
