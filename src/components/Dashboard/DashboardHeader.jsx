import { formatDate } from '../../utils/';
import FilterTag from './FilterTag';

const DashboardHeader = ({
  beerData,
  filterDateRange,
  filterOverview,
  setFilterOverview,
  totalBeerCount,
  setFilterDateRange,
  onFilterClick,
}) => {
  // Flatten to one entry per selected value (filters hold arrays of values)
  const activeFilters = Object.entries(filterOverview).flatMap(([key, value]) => {
    const values = Array.isArray(value) ? value : value ? [value] : [];
    return values.map((v) => [key, v]);
  });

  const handleClearFilter = (key, valueToRemove, e) => {
    e.stopPropagation();
    setFilterOverview((prev) => {
      const values = Array.isArray(prev[key]) ? prev[key] : prev[key] ? [prev[key]] : [];
      return { ...prev, [key]: values.filter((v) => v !== valueToRemove) };
    });
  };

  const handleClearDate = (type, e) => {
    e.stopPropagation();

    const knownDates = beerData
      .map((item) => item.created_at?.split(' ')[0])
      .filter(Boolean)
      .sort();
    const resetDate = type === 'start' ? knownDates[0] : knownDates.at(-1);

    if (resetDate) {
      setFilterDateRange((prev) => ({ ...prev, [type]: resetDate }));
    }
  };

  return (
    <div className="mb-6 px-4 py-6 md:mb-10 md:flex md:items-center md:justify-center">
      <h2 className="flex flex-wrap items-center justify-center gap-2 text-center text-2xl font-bold md:my-3 md:text-3xl">
        <span className="-mt-2.5">
          {totalBeerCount.toLocaleString()} check-in
          {totalBeerCount !== 1 ? 's' : ''}
        </span>

        <span className="text-xl font-normal text-gray-400">between</span>
        <FilterTag
          value={filterDateRange.start ? formatDate(filterDateRange.start) : null}
          isPlaceholder={!filterDateRange.start}
          onClear={(e) => handleClearDate('start', e)}
          onClick={onFilterClick}
        />

        <span className="text-xl font-normal text-gray-400">and</span>
        <FilterTag
          value={filterDateRange.end ? formatDate(filterDateRange.end) : null}
          isPlaceholder={!filterDateRange.end}
          onClear={(e) => handleClearDate('end', e)}
          onClick={onFilterClick}
        />

        <span className="text-xl font-normal text-gray-400">for</span>

        {activeFilters.length > 0 ? (
          <>
            {activeFilters.map(([key, value]) => (
              <FilterTag
                key={`${key}-${value}`}
                label={key.replace('_', ' ')}
                value={value}
                onClear={(e) => handleClearFilter(key, value, e)}
                onClick={onFilterClick}
              />
            ))}
            <FilterTag isPlaceholder onClick={onFilterClick} />
          </>
        ) : (
          <FilterTag isPlaceholder onClick={onFilterClick} />
        )}
      </h2>
    </div>
  );
};

export default DashboardHeader;
