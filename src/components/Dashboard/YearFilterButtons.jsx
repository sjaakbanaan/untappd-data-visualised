import { getDefaultStartDate, getDefaultEndDate } from '../../utils/';

const YearFilterButtons = ({ beerData, filterDateRange, setFilterDateRange }) => {
  // Extract unique years from beerData
  const uniqueYears = [
    ...new Set(beerData.map((item) => new Date(item.created_at).getFullYear())),
  ];
  const uniqueDates = [
    ...new Set(
      beerData.map((item) => new Date(item.created_at).toISOString().slice(0, 10))
    ),
  ];

  return (
    <>
      <div className="block text-white text-sm font-bold mb-2">Drank between</div>
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-none lg:grid-flow-col gap-4">
        <div className="block">
          <button
            key="set-all-time"
            className={`shadow w-full border rounded py-2 px-3 mb-4 ${
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
            className={`shadow w-full border rounded py-2 px-3 mb-4 ${
              filterDateRange?.start === `${uniqueDates[0]}` &&
              filterDateRange?.end == getDefaultEndDate()
                ? 'bg-yellow-500 text-gray-900 border-yellow-500'
                : 'text-white bg-gray-900 hover:bg-gray-700'
            }`}
            onClick={() =>
              setFilterDateRange({
                start: `${uniqueDates[0]}`,
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
              className={`shadow w-full border rounded py-2 px-3 mb-4 transition-colors duration-300 ${
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
    </>
  );
};

export default YearFilterButtons;
