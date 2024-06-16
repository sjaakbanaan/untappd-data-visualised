import { useState, useEffect } from 'react';
import OverviewFilter from './OverviewFilter.jsx';

const OverviewFilters = ({ beerData, filterOverview, setFilterOverview }) => {
  const [filterOptions, setFilterOptions] = useState({
    brewery_name: [],
    brewery_city: [],
    brewery_country: [],
    venue_name: [],
    venue_city: [],
    venue_country: [],
    tagged_friends: [],
  });

  useEffect(() => {
    // Extract unique filter options from beerData
    const filterKeys = [
      'brewery_name',
      'brewery_city',
      'brewery_country',
      'venue_name',
      'venue_city',
      'venue_country',
      'tagged_friends',
    ];
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
    // If value is null, remove the filter from the overview
    const updatedValue = value === null ? '' : value;
    setFilterOverview((prevFilter) => ({ ...prevFilter, [key]: updatedValue }));
  };

  return (
    <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-4">
      {Object.entries(filterOptions).map(([key, options]) => (
        <OverviewFilter
          key={key}
          translate={key == 'venue_country' || key == 'brewery_country'}
          splitValues={key == 'tagged_friends'}
          label={`${key.replace('_', ' ')} (${options.length})`}
          labelPlural={`${key.replace('_', ' ')}s`}
          options={options}
          value={filterOverview?.[key] || null} // Pass null if no value is selected
          onChange={(value) => handleFilterChange(key, value)}
        />
      ))}
    </div>
  );
};

export default OverviewFilters;
