import { getDefaultStartDate, getDefaultEndDate } from '../../utils/';

const ResetFilters = ({ setFilterOverview, setFilterDateRange }) => {
  const handleResetFilters = () => {
    setFilterOverview({
      brewery_name: '',
      brewery_city: '',
      brewery_country: '',
      venue_name: '',
      venue_city: '',
      venue_country: '',
      tagged_friends: '',
      beer_type: '',
    });
    // clear filter input
    setFilterDateRange({
      start: getDefaultStartDate(),
      end: getDefaultEndDate(),
    });
  };

  return (
    <div className="ml-4">
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
