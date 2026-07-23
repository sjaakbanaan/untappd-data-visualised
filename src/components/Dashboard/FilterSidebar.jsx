import { useState, useEffect } from 'react';
import DateSelector from './DateSelector';
import YearFilterButtons from './YearFilterButtons';
import OverviewFilters from '../Overview/OverviewFilters';

const FilterSidebar = ({
  isOpen,
  onClose,
  beerData,
  filterDateRange,
  setFilterDateRange,
  filterOverview,
  setFilterOverview,
  filterYears,
  setFilterYears,
}) => {
  // Tracks whether any filter was changed since the sidebar was opened,
  // to show a "filters applied" notification
  const [filtersChanged, setFiltersChanged] = useState(false);

  useEffect(() => {
    if (!isOpen) setFiltersChanged(false);
  }, [isOpen]);

  const withChangeFlag =
    (setter) =>
    (...args) => {
      setFiltersChanged(true);
      setter(...args);
    };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md bg-gray-900 p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto border-l border-gray-800`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Filters</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
            aria-label="Close sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            {/* Keep the sidebar open so multiple years can be selected */}
            <YearFilterButtons
              beerData={beerData}
              filterDateRange={filterDateRange}
              setFilterDateRange={withChangeFlag(setFilterDateRange)}
              filterYears={filterYears}
              setFilterYears={withChangeFlag(setFilterYears)}
            />
            <div className="mb-2 block text-sm font-bold text-white">
              Custom date range
            </div>
            <DateSelector
              beerData={beerData}
              filterDateRange={filterDateRange}
              setFilterDateRange={withChangeFlag((val) => {
                // A custom range replaces any specific year selection
                setFilterYears([]);
                setFilterDateRange(val);
              })}
              onDateBlur={onClose}
            />
          </div>
          {/* Keep the sidebar open so multiple values can be selected.
              Pass the full dataset; OverviewFilters computes facet-style
              options per filter so selections don't wipe out sibling options. */}
          <OverviewFilters
            beerData={beerData}
            filterOverview={filterOverview}
            setFilterOverview={withChangeFlag(setFilterOverview)}
            filterDateRange={filterDateRange}
            filterYears={filterYears}
          />
        </div>

        {/* Notification once any filter changed while the sidebar is open */}
        {filtersChanged && (
          <div className="sticky bottom-0 -mx-6 -mb-6 mt-8 border-t border-gray-600 bg-gray-900/95 px-6 py-6 backdrop-blur-sm">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="mb-0 flex items-center rounded border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow transition-colors duration-300 hover:bg-gray-900"
              >
                Show changes
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FilterSidebar;
