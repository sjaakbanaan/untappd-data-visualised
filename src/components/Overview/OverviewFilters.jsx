import { useContext, useState, useEffect } from 'react';
import OverviewFilter from './OverviewFilter';
import { DataContext } from '../../DataContext';
import { transformResetList, filterBeerData } from '../../utils/';

const MOBILE_VISIBLE_FILTER_COUNT = 4;

const OverviewFilters = ({
  beerData,
  filterOverview,
  setFilterOverview,
  filterDateRange,
}) => {
  const [showAllFilters, setShowAllFilters] = useState(false);
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
      // Facet-style options: build each dropdown's options from data matching
      // all *other* filters (and the date range), but not its own selection.
      // Otherwise, selecting one value would remove all sibling options.
      const otherFilters = { ...filterOverview, [key]: [] };
      const dataForKey = filterBeerData(
        beerData,
        otherFilters,
        filterDateRange,
        resetList
      );

      uniqueOptions[key] = [...new Set(dataForKey.map((item) => item[key]))]
        .filter(Boolean)
        .filter(
          (option) =>
            key !== 'brewery_state' || (typeof option === 'string' && option.length === 2)
        ) // two-letter state codes
        .sort();
    });

    // Update state with unique filter options
    setFilterOptions(uniqueOptions);
  }, [beerData, resetList, filterOverview, filterDateRange]);

  // Function to handle filter changes; value is an array of selected values
  const handleFilterChange = (key, value) => {
    setFilterOverview((prevFilter) => ({ ...prevFilter, [key]: value || [] }));
  };

  const filterEntries = Object.entries(filterOptions);

  return (
    <div>
      <div className="my-4 flex flex-col gap-4">
        {filterEntries.map(([key, options], i) => (
          <div
            key={key}
            className={
              !showAllFilters && i >= MOBILE_VISIBLE_FILTER_COUNT ? 'hidden' : 'block'
            }
          >
            <OverviewFilter
              filterKey={key}
              splitValues={key == 'tagged_friends'}
              label={`${key.replace('_', ' ')} (${options.length})`}
              labelPlural={`${key.replace('_', ' ')}s`}
              options={options}
              value={filterOverview?.[key] || []}
              onChange={(value) => handleFilterChange(key, value)}
            />
          </div>
        ))}
      </div>

      {/* Show more / fewer — only on mobile when extra filters exist */}
      {filterEntries.length > MOBILE_VISIBLE_FILTER_COUNT && (
        <button
          className="mb-4 block text-sm text-yellow-400 underline underline-offset-2 hover:text-yellow-300"
          onClick={() => setShowAllFilters((prev) => !prev)}
        >
          {showAllFilters
            ? 'Show fewer filters ↑'
            : `Show ${filterEntries.length - MOBILE_VISIBLE_FILTER_COUNT} more filter${
                filterEntries.length - MOBILE_VISIBLE_FILTER_COUNT !== 1 ? 's' : ''
              } ↓`}
        </button>
      )}
    </div>
  );
};

export default OverviewFilters;
