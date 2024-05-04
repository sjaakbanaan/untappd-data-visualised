import ResetFilters from './ResetFilters.jsx';
import { isFilterOverviewSet } from '../../utils';

const DashboardHeader = ({ filterOverview, setFilterOverview, totalBeerCount }) => {
  return (
    <div className="md:flex md:items-center mt-10 md:mb-6">
      <h2 className="text-2xl font-bold">
        {totalBeerCount} beers <span className="text-gray-400">in current selection</span>
      </h2>
      {isFilterOverviewSet(filterOverview) && (
        <ResetFilters setFilterOverview={setFilterOverview} />
      )}
    </div>
  );
};

export default DashboardHeader;
