import { useState } from 'react';
import { getDefaultStartDate, getDefaultEndDate, checkFullDateRange } from '../../utils/';

const MOBILE_VISIBLE_YEAR_COUNT = 8;

const YearFilterButtons = ({ beerData, filterDateRange, setFilterDateRange }) => {
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

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        <div className="inline-block">
          <button
            key="set-last-6-months"
            className={`mb-0 whitespace-nowrap rounded border px-3 py-2 text-sm shadow transition-colors duration-300 ${
              filterDateRange?.start === getDefaultStartDate() &&
              filterDateRange?.end == getDefaultEndDate()
                ? 'border-yellow-500 bg-yellow-500 text-gray-900'
                : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
            onClick={() =>
              setFilterDateRange({
                start: getDefaultStartDate(),
                end: getDefaultEndDate(),
              })
            }
          >
            last 6 months
          </button>
        </div>
        <div className="inline-block">
          <button
            key="set-all-time"
            className={`mb-0 whitespace-nowrap rounded border px-3 py-2 text-sm shadow transition-colors duration-300 ${
              fullDateRange[0]
                ? 'border-yellow-500 bg-yellow-500 text-gray-900'
                : 'bg-gray-900 text-white hover:bg-gray-700'
            }`}
            onClick={() =>
              setFilterDateRange({
                start: `${fullDateRange[1]}`,
                end: getDefaultEndDate(),
              })
            }
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
                // set active state, with an exception for the current year, because then the end value fot filterDateRange is not `${year}-12-31` but getDefaultEndDate():
                (filterDateRange?.start === `${year}-01-01` &&
                  filterDateRange?.end === `${year}-12-31`) ||
                (filterDateRange?.start === `${year}-01-01` &&
                  filterDateRange?.end === getDefaultEndDate())
                  ? 'border-yellow-500 bg-yellow-500 text-gray-900 hover:bg-yellow-400'
                  : 'bg-gray-900 text-white hover:bg-gray-700'
              }`}
              onClick={() =>
                setFilterDateRange({
                  start: `${year}-01-01`,
                  // set today's date in case the selected year is the current one:
                  end:
                    getDefaultEndDate() < `${year}-12-31`
                      ? getDefaultEndDate()
                      : `${year}-12-31`,
                })
              }
            >
              {year}
            </button>
          </div>
        ))}
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
