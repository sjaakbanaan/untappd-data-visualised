const ResetFilters = ({ setFilterOverview }) => {
  const handleResetFilters = () => {
    setFilterOverview({
      brewery_name: '',
      venue_country: '',
      venue_city: '',
    });
    // clear filter input
  };

  return (
    <div className="ml-4">
      <button
        className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 shadow border-yellow-500 rounded py-2 px-3 transition-colors duration-300"
        onClick={handleResetFilters}
      >
        Reset filters
      </button>
    </div>
  );
};

export default ResetFilters;
