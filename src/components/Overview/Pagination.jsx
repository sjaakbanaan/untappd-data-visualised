const Pagination = ({
  beerData,
  overviewRef,
  ItemsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(beerData.length / ItemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    scrollToTop();
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    scrollToTop();
  };

  const handlePageNumbers = (pageNumber) => {
    setCurrentPage(pageNumber);
    scrollToTop();
  };

  const scrollToTop = () => {
    if (overviewRef.current) {
      overviewRef.current.scrollIntoView({ behavior: 'auto' });
    }
  };

  return (
    <div className="flex justify-center flex-wrap mt-10">
      <button
        className={`${
          currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-700'
        }  transition-colors duration-300 bg-gray-900 shadow border rounded my-2 py-2 px-3 text-white mr-2`}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          disabled={currentPage === index + 1}
          className={`${
            currentPage === index + 1
              ? 'bg-yellow-500 text-gray-900'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          } transition-colors duration-300 my-2 py-2 px-3 mx-2 rounded`}
          onClick={() => handlePageNumbers(index + 1)}
          title={`go to ${index + 1}`}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`${
          currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-700'
        }  transition-colors duration-300 bg-gray-900 shadow border rounded my-2 py-2 px-3 text-white ml-2`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
