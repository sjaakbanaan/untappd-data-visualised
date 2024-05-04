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

  // Determine the start and end index for the number buttons
  let startPage = Math.max(currentPage - 2, 1);
  const endPage = Math.min(startPage + 4, totalPages);

  // If there are not enough numbers after the current page, adjust the start index
  if (endPage - startPage < 4) {
    startPage = Math.max(endPage - 4, 1);
  }

  return (
    <div className="flex justify-center flex-wrap mt-4">
      <button
        className={`${
          currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-700'
        } transition-colors duration-300 bg-gray-900 shadow border rounded my-2 py-2 px-3 text-white mr-2`}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {startPage > 1 && (
        <button
          key={1}
          className="transition-colors duration-300 bg-gray-800 text-white hover:bg-gray-700 my-2 py-2 px-3 mx-2 rounded"
          onClick={() => handlePageNumbers(1)}
          title="go to 1"
        >
          1
        </button>
      )}
      {startPage > 2 && <span className="mx-2 py-3">...</span>}
      {Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
        <button
          key={startPage + index}
          disabled={currentPage === startPage + index}
          className={`${
            currentPage === startPage + index
              ? 'bg-yellow-500 text-gray-900'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          } transition-colors duration-300 my-2 py-2 px-3 mx-2 rounded`}
          onClick={() => handlePageNumbers(startPage + index)}
          title={`go to ${startPage + index}`}
        >
          {startPage + index}
        </button>
      ))}
      {endPage < totalPages - 1 && <span className="mx-2 py-3">...</span>}
      {endPage < totalPages && (
        <button
          key={totalPages}
          className="transition-colors duration-300 bg-gray-800 text-white hover:bg-gray-700 my-2 py-2 px-3 mx-2 rounded"
          onClick={() => handlePageNumbers(totalPages)}
          title={`go to ${totalPages}`}
        >
          {totalPages}
        </button>
      )}
      <button
        className={`${
          currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-700'
        } transition-colors duration-300 bg-gray-900 shadow border rounded my-2 py-2 px-3 text-white ml-2`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
