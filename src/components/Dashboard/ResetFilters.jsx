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
        className="bg-yellow-400 hover:bg-yellow-700 transition-colors duration-300 text-white font-bold py-1 px-2 rounded"
        onClick={handleResetFilters}
      >
        Reset filters
      </button>
    </div>
  );
};

export default ResetFilters;
