import { getDefaultStartDate, getDefaultEndDate } from '../../utils/';
import { useContext } from 'react';
import { DataContext } from '../../DataContext';
import Icon from '../UI/Icon/Icon';

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
    <a
      href="#"
      onClick={handleResetFilters}
      className="text-yellow-500 flex underline hover:text-yellow-400 ml-4 hover:no-underline text-sm"
    >
      <Icon icon="CLOSE" className="mr-1 w-3 fill-yellow-500" />
      Reset filters
    </a>
  );
};

export default ResetFilters;
