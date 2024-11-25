export const filterBeerData = (beerData, filterOverview, filterDateRange) => {
  // Helper function to generate filter functions dynamically
  const generateFilterFunction = (filterKey) => (item) =>
    !filterOverview[filterKey] ||
    item[filterKey]?.toLowerCase().includes(filterOverview[filterKey].toLowerCase());

  // Filter functions for each filter key
  const filterFunctions = {
    brewery_name: generateFilterFunction('brewery_name'),
    brewery_city: generateFilterFunction('brewery_city'),
    brewery_country: generateFilterFunction('brewery_country'),
    venue_name: generateFilterFunction('venue_name'),
    venue_city: generateFilterFunction('venue_city'),
    venue_country: generateFilterFunction('venue_country'),
    tagged_friends: generateFilterFunction('tagged_friends'),
    beer_type: generateFilterFunction('beer_type'),

    // Date range filter
    date: (item) =>
      (!filterDateRange.start ||
        new Date(item.created_at.split(' ')[0]) >= new Date(filterDateRange.start)) &&
      (!filterDateRange.end ||
        new Date(item.created_at.split(' ')[0]) <= new Date(filterDateRange.end)),
  };

  // Apply filters whenever filterOverview or filterDateRange changes
  return beerData.filter((item) =>
    Object.values(filterFunctions).every((func) => func(item))
  );
};
