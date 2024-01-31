/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { useState, useEffect } from 'react';

const OverviewFilters = ({
  beerData,
  filterBrewery,
  setFilterBrewery,
  filterCountry,
  setFilterCountry,
}) => {
  const [breweryOptions, setBreweryOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    // Extract unique brewery names and countries from filteredData
    const uniqueBreweries = [...new Set(beerData.map((item) => item.brewery_name))]
      .filter(Boolean)
      .sort();
    const uniqueCountries = [...new Set(beerData.map((item) => item.venue_country))]
      .filter(Boolean)
      .sort();

    // Update state with unique brewery and country options
    setBreweryOptions(uniqueBreweries);
    setCountryOptions(uniqueCountries);
  }, [beerData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      <div>
        <label className="block text-white text-sm font-bold mb-2">
          Filter by country
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
          value={filterCountry}
          onChange={(e) => setFilterCountry(e.target.value)}
        >
          <option value="">All Countries</option>
          {countryOptions.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-white text-sm font-bold mb-2">
          Filter by brewery
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
          value={filterBrewery}
          onChange={(e) => setFilterBrewery(e.target.value)}
        >
          <option value="">All Breweries</option>
          {breweryOptions.map((brewery) => (
            <option key={brewery} value={brewery}>
              {brewery}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OverviewFilters;
