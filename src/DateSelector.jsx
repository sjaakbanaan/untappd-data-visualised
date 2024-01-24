/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
const DateSelector = ({ filterDateRange, setFilterDateRange }) => {
  return (
    <div className="mb-4">
      <label className="block text-white text-sm font-bold mb-2">Created Between:</label>
      <div className="flex">
        <input
          type="date"
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          value={filterDateRange.start}
          onChange={(e) =>
            setFilterDateRange({ ...filterDateRange, start: e.target.value })
          }
        />
        <input
          type="date"
          className="ml-2 shadow appearance-none border rounded w-1/2 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          value={filterDateRange.end}
          onChange={(e) =>
            setFilterDateRange({ ...filterDateRange, end: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default DateSelector;
