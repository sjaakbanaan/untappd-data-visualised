const OverviewFilter = ({ label, labelPlural, options, value, onChange }) => {
  return (
    <div>
      <label htmlFor={labelPlural} className="block text-white text-sm font-bold mb-2">
        Filter by {label}
      </label>
      <select
        id={labelPlural}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All {labelPlural}</option>
        {options &&
          options.length > 0 &&
          options.map((option) => (
            <option key={option} value={option} selected={value === option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default OverviewFilter;
