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
    <div className="mb-8 md:mb-0">
      <div className="block text-white text-sm font-bold mb-2">Drank between</div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-none lg:grid-flow-col gap-4">
        <div className="block">
          <button
            key="set-all-time"
            className={`transition-colors duration-300 shadow w-full border rounded py-2 px-3 mb-0 md:mb-4 ${
              filterDateRange?.start === getDefaultStartDate() &&
              filterDateRange?.end == getDefaultEndDate()
                ? 'bg-yellow-500 text-gray-900 border-yellow-500'
                : 'text-white bg-gray-900 hover:bg-gray-700'
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
            className={`transition-colors duration-300 shadow w-full border rounded py-2 px-3 mb-0 md:mb-4 ${
              fullDateRange[0]
                ? 'bg-yellow-500 text-gray-900 border-yellow-500'
                : 'text-white bg-gray-900 hover:bg-gray-700'
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
              className={`transition-colors duration-300 shadow w-full border rounded py-2 px-3 mb-0 md:mb-4 ${
                // set active state, with an exception for the current year, because then the end value fot filterDateRange is not `${year}-12-31` but getDefaultEndDate():
                (filterDateRange?.start === `${year}-01-01` &&
                  filterDateRange?.end === `${year}-12-31`) ||
                (filterDateRange?.start === `${year}-01-01` &&
                  filterDateRange?.end === getDefaultEndDate())
                  ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900 border-yellow-500'
                  : 'text-white bg-gray-900 hover:bg-gray-700'
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
