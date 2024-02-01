/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { useState, useEffect } from 'react';
import OverviewFilter from './OverviewFilter.jsx';

const OverviewFilters = ({
  beerData,
  filterBrewery,
  setFilterBrewery,
  filterCountry,
  setFilterCountry,
  filterCity,
  setFilterCity,
}) => {
  const [breweryOptions, setBreweryOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    // Extract unique brewery names and countries from filteredData
    const uniqueBreweries = [...new Set(beerData.map((item) => item.brewery_name))]
      .filter(Boolean)
      .sort();
    const uniqueCountries = [...new Set(beerData.map((item) => item.venue_country))]
      .filter(Boolean)
      .sort();
    const uniqueCities = [...new Set(beerData.map((item) => item.brewery_city))]
      .filter(Boolean)
      .sort();

    // Update state with unique brewery and country options
    setBreweryOptions(uniqueBreweries);
    setCountryOptions(uniqueCountries);
    setCityOptions(uniqueCities);
  }, [beerData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      <OverviewFilter
        label={`Country drank at (${countryOptions.length})`}
        labelPlural="countries"
        options={countryOptions}
        value={filterCountry}
        onChange={setFilterCountry}
      />
      <OverviewFilter
        label={`Brewery city (${cityOptions.length})`}
        labelPlural="cities"
        options={cityOptions}
        value={filterCity}
        onChange={setFilterCity}
      />
      <OverviewFilter
        label={`Brewery (${breweryOptions.length})`}
        labelPlural="breweries"
        options={breweryOptions}
        value={filterBrewery}
        onChange={setFilterBrewery}
      />
    </div>
  );
};

export default OverviewFilters;
