/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { useState, useEffect } from 'react';
import OverviewFilter from './OverviewFilter.jsx';

const OverviewFilters = ({ beerData, filterOverview, setFilterOverview }) => {
  const [filterOptions, setFilterOptions] = useState({
    brewery_name: [],
    venue_country: [],
    venue_city: [],
  });

  useEffect(() => {
    // Extract unique brewery names, countries, and cities from filteredData
    const uniqueBreweries = [...new Set(beerData.map((item) => item.brewery_name))]
      .filter(Boolean)
      .sort();
    const uniqueCountries = [...new Set(beerData.map((item) => item.venue_country))]
      .filter(Boolean)
      .sort();
    const uniqueCities = [...new Set(beerData.map((item) => item.venue_city))]
      .filter(Boolean)
      .sort();

    // console.log('beerData', beerData);

    // Update state with unique brewery, country, and city options
    setFilterOptions({
      brewery_name: uniqueBreweries,
      venue_country: uniqueCountries,
      venue_city: uniqueCities,
    });
  }, [beerData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
      <OverviewFilter
        label={`country drank at (${filterOptions.venue_country.length})`}
        labelPlural="countries"
        options={filterOptions.venue_country}
        value={filterOverview?.venue_country}
        onChange={(value) =>
          setFilterOverview((prevFilter) => ({ ...prevFilter, venue_country: value }))
        }
      />
      <OverviewFilter
        label={`city drank at (${filterOptions.venue_city.length})`}
        labelPlural="cities"
        options={filterOptions.venue_city}
        value={filterOverview?.venue_city}
        onChange={(value) =>
          setFilterOverview((prevFilter) => ({ ...prevFilter, venue_city: value }))
        }
      />
      <OverviewFilter
        label={`brewery (${filterOptions.brewery_name.length})`}
        labelPlural="breweries"
        options={filterOptions.brewery_name}
        value={filterOverview?.brewery_name}
        onChange={(value) =>
          setFilterOverview((prevFilter) => ({ ...prevFilter, brewery_name: value }))
        }
      />
    </div>
  );
};

export default OverviewFilters;
