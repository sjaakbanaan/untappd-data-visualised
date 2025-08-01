import { useContext } from 'react';
import { useState, useEffect } from 'react';
import OverviewFilter from './OverviewFilter';
import { DataContext } from '../../DataContext';
import { transformResetList } from '../../utils/';

const OverviewFilters = ({ beerData, filterOverview, setFilterOverview }) => {
  const { resetList } = useContext(DataContext);
  // set empty filter options state
  const [filterOptions, setFilterOptions] = useState(
    transformResetList(resetList, 'arrays')
  );

  useEffect(() => {
    // Extract unique filter options from beerData
    const filterKeys = transformResetList(resetList, 'keyArrays');
    const uniqueOptions = {};

    filterKeys.forEach((key) => {
      uniqueOptions[key] = [...new Set(beerData.map((item) => item[key]))]
        .filter(Boolean)
        .filter(
          (option) =>
            key !== 'brewery_state' || (typeof option === 'string' && option.length === 2)
        ) // two-letter state codes
        .sort();
    });

    // Update state with unique filter options
    setFilterOptions(uniqueOptions);
  }, [beerData, resetList]);

  // Function to handle filter changes
  const handleFilterChange = (key, value) => {
    // If value is null, remove the filter from the overview
    const updatedValue = value === null ? '' : value;
    setFilterOverview((prevFilter) => ({ ...prevFilter, [key]: updatedValue }));
  };

  return (
    <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {Object.entries(filterOptions).map(([key, options]) => (
        <OverviewFilter
          key={key}
          filterKey={key}
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
