const ActiveFiltersDisplay = ({ filterOverview }) => {
  // Flatten to a list of active filter values. Filters hold arrays of values,
  // but old saved shares may still contain plain strings.
  const activeFilters = Object.values(filterOverview || {}).flatMap((value) =>
    Array.isArray(value) ? value : value ? [value] : []
  );

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
