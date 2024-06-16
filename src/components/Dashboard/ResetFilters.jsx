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
        className="rounded border-yellow-500 bg-yellow-500 px-3 py-2 text-gray-900 shadow transition-colors duration-300 hover:bg-yellow-400"
        onClick={handleResetFilters}
      >
        Reset filters
      </button>
    </div>
  );
};

export default ResetFilters;
