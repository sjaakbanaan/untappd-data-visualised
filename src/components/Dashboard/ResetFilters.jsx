const ResetFilters = ({ setFilterOverview }) => {
  const handleResetFilters = () => {
    setFilterOverview({
      brewery_name: '',
      brewery_city: '',
      brewery_country: '',
      venue_name: '',
      venue_city: '',
      venue_country: '',
      tagged_friends: '',
    });
    // clear filter input
  };

  return (
    <div className="ml-4">
      <button
        className="transition-colors duration-300 bg-yellow-500 hover:bg-yellow-400 text-gray-900 shadow border-yellow-500 rounded py-2 px-3"
        onClick={handleResetFilters}
      >
        Reset filters
      </button>
    </div>
  );
};

export default ResetFilters;
