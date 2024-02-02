const ResetFilters = ({ setFilterOverview }) => {
  const handleResetFilters = () => {
    setFilterOverview('');
  };

  return (
    <div className="ml-4">
      <button
        className="bg-yellow-600 hover:bg-yellow-700 transition-colors duration-300 text-white font-bold py-1 px-2 rounded"
        onClick={handleResetFilters}
      >
        Reset filters
      </button>
    </div>
  );
};

export default ResetFilters;
