import { useState, useEffect } from 'react';
import OverviewFilter from './OverviewFilter.jsx';

const OverviewFilters = ({ beerData, filterOverview, setFilterOverview }) => {
  const [filterOptions, setFilterOptions] = useState({
    brewery_name: [],
    venue_country: [],
    venue_city: [],
    beer_type: [],
  });

  useEffect(() => {
    // Extract unique filter options from beerData
    const filterKeys = ['brewery_name', 'venue_country', 'venue_city', 'beer_type'];
    const uniqueOptions = {};

    filterKeys.forEach((key) => {
      uniqueOptions[key] = [...new Set(beerData.map((item) => item[key]))]
        .filter(Boolean)
        .sort();
    });

    // Update state with unique filter options
    setFilterOptions(uniqueOptions);
  }, [beerData]);

  // Function to handle filter changes
  const handleFilterChange = (key, value) => {
    setFilterOverview((prevFilter) => ({ ...prevFilter, [key]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
      {Object.entries(filterOptions).map(([key, options]) => (
        <OverviewFilter
          key={key}
          label={`${key.replace('_', ' ')} (${options.length})`}
          labelPlural={`${key.replace('_', ' ')}s`}
          options={options}
          value={filterOverview?.[key]}
          onChange={(value) => handleFilterChange(key, value)}
        />
      ))}
    </div>
  );
};

export default OverviewFilters;
