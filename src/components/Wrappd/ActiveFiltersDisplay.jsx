const ActiveFiltersDisplay = ({ filterOverview }) => {
  // Filter out empty values and create an array of active filters
  const activeFilters = Object.entries(filterOverview)
    .filter(([, value]) => value && value !== '')
    .map(([, value]) => value);

  return (
    <div>
      {activeFilters.map((value, index) => (
        <span key={index}>
          {value}
          {index < activeFilters.length - 1 ? ', ' : ''}
        </span>
      ))}
    </div>
  );
};

export default ActiveFiltersDisplay;
