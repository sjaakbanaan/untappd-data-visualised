const EntryCounter = ({ minimumEntries, increment, decrement }) => {
  <div className="text-lf font-semibold text-gray-600 mb-3">
    at least {minimumEntries}
    <button className="px-2 border-2 border-gray-600 mx-2 font-bold" onClick={increment}>
      +
    </button>
    {minimumEntries > 1 && (
      <button className="px-2 border-2 border-gray-600 font-bold" onClick={decrement}>
        -
      </button>
    )}
  </div>;
};

export default EntryCounter;
