/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { useState, useEffect } from 'react';
import OverviewFilter from './OverviewFilter.jsx';

const OverviewFilters = ({ beerData, filterOverview, setFilterOverview }) => {
  const [filterOptions, setFilterOptions] = useState({
    brewery: [],
    country: [],
    city: [],
  });

  useEffect(() => {
    // Extract unique brewery names, countries, and cities from filteredData
    const uniqueBreweries = [...new Set(beerData.map((item) => item.brewery_name))]
      .filter(Boolean)
      .sort();
    const uniqueCountries = [...new Set(beerData.map((item) => item.venue_country))]
      .filter(Boolean)
      .sort();
    const uniqueCities = [...new Set(beerData.map((item) => item.brewery_city))]
      .filter(Boolean)
      .sort();

    // console.log('beerData', beerData);

    // Update state with unique brewery, country, and city options
    setFilterOptions({
      brewery: uniqueBreweries,
      country: uniqueCountries,
      city: uniqueCities,
    });
  }, [beerData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      <OverviewFilter
        label={`country drank at (${filterOptions.country.length})`}
        labelPlural="countries"
        options={filterOptions.country}
        value={filterOverview?.venue_country}
        onChange={(value) =>
          setFilterOverview((prevFilter) => ({ ...prevFilter, venue_country: value }))
        }
      />
      <OverviewFilter
        label={`brewery city (${filterOptions.city.length})`}
        labelPlural="cities"
        options={filterOptions.city}
        value={filterOverview?.brewery_city}
        onChange={(value) =>
          setFilterOverview((prevFilter) => ({ ...prevFilter, brewery_city: value }))
        }
      />
      <OverviewFilter
        label={`brewery (${filterOptions.brewery.length})`}
        labelPlural="breweries"
        options={filterOptions.brewery}
        value={filterOverview?.brewery_name}
        onChange={(value) =>
          setFilterOverview((prevFilter) => ({ ...prevFilter, brewery_name: value }))
        }
      />
    </div>
  );
};

export default OverviewFilters;
