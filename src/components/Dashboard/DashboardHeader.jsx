import ResetFilters from './ResetFilters.jsx';
import { isFilterOverviewSet } from '../../utils';

const DashboardHeader = ({
  filterDateRange,
  filterOverview,
  setFilterOverview,
  totalBeerCount,
  setFilterDateRange,
}) => {
  return (
    <div className="mt-10 md:mb-6 md:flex md:items-center">
      <h2 className="my-3 text-2xl font-bold">
        {totalBeerCount} checkins{' '}
        <span className="text-gray-400">in current selection</span>
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
