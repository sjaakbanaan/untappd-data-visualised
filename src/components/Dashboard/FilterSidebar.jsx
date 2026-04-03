import React from 'react';
import DateSelector from './DateSelector';
import YearFilterButtons from './YearFilterButtons';
import OverviewFilters from '../Overview/OverviewFilters';

const FilterSidebar = ({
  isOpen,
  onClose,
  beerData,
  filteredData,
  filterDateRange,
  setFilterDateRange,
  filterOverview,
  setFilterOverview,
}) => {
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
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-[#121212] p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
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
              className="h-6 w-6"
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
            <div className="mb-2 block text-sm font-bold text-white">
              Set a date range
            </div>
            <DateSelector
              beerData={beerData}
              filterDateRange={filterDateRange}
              setFilterDateRange={setFilterDateRange}
            />
          </div>
          <YearFilterButtons
            beerData={beerData}
            filterDateRange={filterDateRange}
            setFilterDateRange={setFilterDateRange}
          />
          <OverviewFilters
            beerData={filteredData}
            filterOverview={filterOverview}
            setFilterOverview={setFilterOverview}
          />
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
