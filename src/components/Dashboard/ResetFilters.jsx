import { getDefaultStartDate, getDefaultEndDate } from '../../utils/';
import { useContext } from 'react';
import { DataContext } from '../../DataContext';

const ResetFilters = ({ setFilterOverview, setFilterDateRange }) => {
  const { resetList } = useContext(DataContext);

  const handleResetFilters = () => {
    setFilterOverview(resetList);
    // clear filter input
    setFilterDateRange({
      start: getDefaultStartDate(),
      end: getDefaultEndDate(),
    });
  };

  return (
    <div className="md:ml-4 mb-12 md:mb-0">
      <button
        className="rounded border-yellow-500 bg-yellow-500 px-3 py-2 text-black shadow transition-colors duration-300 hover:bg-yellow-400"
        onClick={handleResetFilters}
      >
        Reset to last 6 months
      </button>
    </div>
  );
};

export default ResetFilters;
