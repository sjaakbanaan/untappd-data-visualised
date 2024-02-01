export const filterBeerData = (
  beerData,
  filterBrewery,
  filterCountry,
  filterCity,
  filterDateRange
) => {
  // Check if start date is greater than end date
  if (
    filterDateRange.start &&
    filterDateRange.end &&
    new Date(filterDateRange.start) > new Date(filterDateRange.end)
  ) {
    return []; // Return an empty array if start date is greater than end date
  }

  // Apply filters whenever filterBrewery or filterDateRange changes
  return beerData.filter((item) => {
    const breweryMatch = filterBrewery
      ? item?.brewery_name?.toLowerCase().includes(filterBrewery.toLowerCase())
      : true;

    const countryMatch = filterCountry
      ? item?.venue_country?.toLowerCase().includes(filterCountry.toLowerCase())
      : true;

    const cityMatch = filterCity
      ? item?.brewery_city?.toLowerCase().includes(filterCity.toLowerCase())
      : true;

    const dateMatch =
      filterDateRange.start &&
      filterDateRange.end &&
      new Date(item.created_at) >= new Date(filterDateRange.start) &&
      new Date(item.created_at) <= new Date(filterDateRange.end);

    return breweryMatch && countryMatch && dateMatch & cityMatch;
  });
};
