const EntryCounter = ({ minimumEntries, increment, decrement }) => {
  return (
    <div className="flex text-lf font-semibold text-gray-400 mb-3">
      <div className="w-20">at least {minimumEntries}</div>
      <button
        className="px-2 border-2 border-gray-600 ml-2 mr-2 font-bold"
        disabled={minimumEntries <= 1}
        onClick={decrement}
      >
        -
      </button>
      <button className="px-2 border-2 border-gray-600 font-bold" onClick={increment}>
        +
      </button>
    </div>
  );
};

export default EntryCounter;
