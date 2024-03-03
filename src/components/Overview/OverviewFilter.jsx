import countriesData from '../../countries.json';

const OverviewFilter = ({ label, labelPlural, options, value, onChange }) => {
  const translateToEnglish = (originalName) => {
    const country = countriesData.countries.find((c) => c.original === originalName);
    return country ? country.english : originalName;
  };

  return (
    <div>
      <label htmlFor={labelPlural} className="block text-white text-sm font-bold mb-2">
        Filter by {label}
      </label>
      <select
        id={labelPlural}
        className="shadow appearance-none border bg-gray-900 rounded w-full border-white py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option className="bg-gray-900" value="">
          All
        </option>
        {options &&
          options.length > 0 &&
          options.map((option) => (
            <option className="bg-gray-900" key={option} value={option}>
              {translateToEnglish(option)}
            </option>
          ))}
      </select>
    </div>
  );
};

export default OverviewFilter;
