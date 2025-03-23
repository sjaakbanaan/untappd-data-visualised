import { getDefaultStartDate, getDefaultEndDate, checkFullDateRange } from '../../utils/';

const YearFilterButtons = ({ beerData, filterDateRange, setFilterDateRange }) => {
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
    <div className="mb-8 md:mb-8">
      <div className="mb-2 block text-sm font-bold text-white">Set a date range</div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-flow-row xl:grid-cols-8">
        <div className="block">
          <button
            key="set-last-6-months"
            className={`mb-0 w-full rounded border px-3 py-2 shadow transition-colors duration-300 ${
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
        <div className="block">
          <button
            key="set-all-time"
            className={`mb-0 w-full rounded border px-3 py-2 shadow transition-colors duration-300 ${
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
          <div className="block" key={i}>
            <button
              className={`mb-0 w-full rounded border px-3 py-2 shadow transition-colors duration-300 ${
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
    </div>
  );
};

export default YearFilterButtons;
