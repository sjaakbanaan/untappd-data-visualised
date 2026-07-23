import { useState } from 'react';
import {
  getDefaultStartDate,
  getDefaultEndDate,
  getYearsDateRange,
  checkFullDateRange,
} from '../../utils/';

const MOBILE_VISIBLE_YEAR_COUNT = 8;

const YearFilterButtons = ({
  beerData,
  filterDateRange,
  setFilterDateRange,
  filterYears,
  setFilterYears,
}) => {
  const [showAllYears, setShowAllYears] = useState(false);
  // Extract unique years from beerData
  const uniqueYears = [
    ...new Set(beerData.map((item) => new Date(item.created_at).getFullYear())),
  ];

  const fullDateRange = checkFullDateRange(
    getDefaultEndDate(),
    beerData,
    filterDateRange
  );

  // Toggle a year on/off; the date range is kept in sync with the span of the
  // selected years, while filterYears excludes unselected years in between
  const toggleYear = (year) => {
    const nextYears = filterYears.includes(year)
      ? filterYears.filter((y) => y !== year)
      : [...filterYears, year].sort();
    setFilterYears(nextYears);
    setFilterDateRange(getYearsDateRange(nextYears));
  };

  return (
    <div className="mb-8">
      <div className="mb-2 block text-sm font-bold text-white">Year selection</div>
      <div className="flex flex-wrap gap-2">
        <div className="inline-block">
          <button
            key="set-all-time"
            className={`mb-0 whitespace-nowrap rounded border px-3 py-2 text-sm shadow transition-colors duration-300 ${
              fullDateRange[0] && filterYears.length === 0
                ? 'border-yellow-500 bg-yellow-500 text-gray-900'
                : 'border-gray-600 bg-gray-900 text-white hover:bg-gray-700'
            }`}
            onClick={() => {
              setFilterYears([]);
              setFilterDateRange({
                start: `${fullDateRange[1]}`,
                end: getDefaultEndDate(),
              });
            }}
          >
            all time
          </button>
        </div>

        {uniqueYears.map((year, i) => (
          <div
            className={`inline-block ${
              !showAllYears && i >= MOBILE_VISIBLE_YEAR_COUNT
                ? 'hidden md:inline-block'
                : ''
            }`}
            key={i}
          >
            <button
              className={`mb-0 whitespace-nowrap rounded border px-3 py-2 text-sm shadow transition-colors duration-300 ${
                filterYears.includes(year)
                  ? 'border-yellow-500 bg-yellow-500 text-gray-900 hover:bg-yellow-400'
                  : 'border-gray-600 bg-gray-900 text-white hover:bg-gray-700'
              }`}
              onClick={() => toggleYear(year)}
            >
              {year}
            </button>
          </div>
        ))}
        <div className="inline-block">
          <button
            key="set-last-6-months"
            className={`mb-0 whitespace-nowrap rounded border px-3 py-2 text-sm shadow transition-colors duration-300 ${
              filterDateRange?.start === getDefaultStartDate() &&
              filterDateRange?.end == getDefaultEndDate() &&
              filterYears.length === 0
                ? 'border-yellow-500 bg-yellow-500 text-gray-900'
                : 'border-gray-600 bg-gray-900 text-white hover:bg-gray-700'
            }`}
            onClick={() => {
              setFilterYears([]);
              setFilterDateRange({
                start: getDefaultStartDate(),
                end: getDefaultEndDate(),
              });
            }}
          >
            last 6 months
          </button>
        </div>
      </div>

      {/* Show more / fewer toggle */}
      {uniqueYears.length > MOBILE_VISIBLE_YEAR_COUNT && (
        <button
          className="mt-4 block text-sm text-yellow-400 underline underline-offset-2 hover:text-yellow-300 md:hidden"
          onClick={() => setShowAllYears((prev) => !prev)}
        >
          {showAllYears
            ? 'Show fewer years ↑'
            : `Show ${uniqueYears.length - MOBILE_VISIBLE_YEAR_COUNT} more year${
                uniqueYears.length - MOBILE_VISIBLE_YEAR_COUNT !== 1 ? 's' : ''
              } ↓`}
        </button>
      )}
    </div>
  );
};

export default YearFilterButtons;
