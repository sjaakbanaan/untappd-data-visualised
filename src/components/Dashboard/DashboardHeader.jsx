import ResetFilters from './ResetFilters';
import { isFilterOverviewSet, formatDate } from '../../utils/';

const DashboardHeader = ({
  filterDateRange,
  filterOverview,
  setFilterOverview,
  totalBeerCount,
  setFilterDateRange,
  onFilterClick,
}) => {
  const activeFilters = Object.entries(filterOverview).filter(
    ([key, value]) => value !== ''
  );

  return (
    <div className="md:flex md:flex md:items-center md:justify-center ml- mb-6 md:mb-10">
      <h2 className="my-6 flex flex-wrap items-center justify-center gap-2 text-center text-2xl font-bold md:my-3 lg:justify-start">
        <span className="-mt-2">{totalBeerCount.toLocaleString()} check-ins</span>

        <span className="text-lg font-normal text-gray-400">between</span>
        <span
          onClick={onFilterClick}
          className="cursor-pointer rounded border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 text-sm font-normal text-yellow-500 transition-colors hover:bg-yellow-500/20"
        >
          {formatDate(filterDateRange.start)}
        </span>
        <span className="text-lg font-normal text-gray-400">and</span>
        <span
          onClick={onFilterClick}
          className="cursor-pointer rounded border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 text-sm font-normal text-yellow-500 transition-colors hover:bg-yellow-500/20"
        >
          {formatDate(filterDateRange.end)}
        </span>

        {activeFilters.length > 0 && (
          <span className="text-lg font-normal text-gray-400">for</span>
        )}

        {activeFilters.map(([key, value]) => (
          <span
            key={key}
            onClick={onFilterClick}
            className="cursor-pointer whitespace-nowrap rounded border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 text-sm font-normal text-yellow-500 transition-colors hover:bg-yellow-500/20"
          >
            <span className="mr-1 text-gray-400">{key.replace('_', ' ')}:</span>
            {value}
          </span>
        ))}
      </h2>
      {isFilterOverviewSet(filterOverview, filterDateRange) && (
        <ResetFilters
          setFilterOverview={setFilterOverview}
          setFilterDateRange={setFilterDateRange}
        />
      )}
    </div>
  );
};

export default DashboardHeader;
