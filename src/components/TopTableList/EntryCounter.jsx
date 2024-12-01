const EntryCounter = ({ minimumCheckins, increment, decrement }) => {
  return (
    <div className="mb-3 flex text-lg font-semibold text-gray-400">
      <div className="mr-2 w-[84px] whitespace-nowrap">at least {minimumCheckins}</div>
      <button
        className="mx-2 border-2 border-gray-600 px-2 font-bold transition-colors duration-300"
        disabled={minimumCheckins <= 1}
        onClick={decrement}
      >
        -
      </button>
      <button
        className="border-2 border-gray-600 px-2 font-bold transition-colors duration-300"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default EntryCounter;
