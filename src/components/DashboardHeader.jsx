import ResetFilters from './ResetFilters.jsx';
import { filterDuplicateBeers, isFilterOverviewSet } from '../utils/';

const DashboardHeader = ({
  beerData,
  filterDateRange,
  filterOverview,
  setFilterOverview,
  totalBeerCount,
}) => {
  const totalUniqueBeerCount = beerData && filterDuplicateBeers(beerData)?.length;
  const totalDiff = totalBeerCount - totalUniqueBeerCount;

  const totalDays =
    filterDateRange &&
    (new Date(filterDateRange.end) - new Date(filterDateRange.start)) /
      (1000 * 60 * 60 * 24);
  return (
    <div className="flex items-center mt-10 mb-6">
      <h2 className="text-2xl font-bold">
        {totalBeerCount} beers <span className="text-gray-600">/</span>{' '}
        {totalUniqueBeerCount} uniques{' '}
        <span className="text-gray-600">(+{totalDiff})</span>
      </h2>
      <div className="ml-2 text-yellow-500">
        {(totalBeerCount / totalDays).toFixed(2)} per day
      </div>
      {isFilterOverviewSet(filterOverview) && (
        <ResetFilters setFilterOverview={setFilterOverview} />
      )}
    </div>
  );
};

export default DashboardHeader;
