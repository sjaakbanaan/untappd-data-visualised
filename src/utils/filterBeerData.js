export const filterBeerData = (beerData, filterOverview, filterDateRange) => {
  // Check if start date is greater than end date
  if (
    filterDateRange.start &&
    filterDateRange.end &&
    new Date(filterDateRange.start) > new Date(filterDateRange.end)
  ) {
    return []; // Return an empty array if start date is greater than end date
  }

  // Apply filters whenever filterOverview or filterDateRange changes
  return beerData.filter((item) => {
    const breweryMatch = filterOverview.brewery_name
      ? item?.brewery_name
          ?.toLowerCase()
          .includes(filterOverview.brewery_name.toLowerCase())
      : true;

    const countryMatch = filterOverview.venue_country
      ? item?.venue_country
          ?.toLowerCase()
          .includes(filterOverview.venue_country.toLowerCase())
      : true;

    const cityMatch = filterOverview.brewery_city
      ? item?.brewery_city
          ?.toLowerCase()
          .includes(filterOverview.brewery_city.toLowerCase())
      : true;

    const dateMatch =
      filterDateRange.start &&
      filterDateRange.end &&
      new Date(item.created_at) >= new Date(filterDateRange.start) &&
      new Date(item.created_at) <= new Date(filterDateRange.end);

    return breweryMatch && countryMatch && dateMatch && cityMatch;
  });
};
