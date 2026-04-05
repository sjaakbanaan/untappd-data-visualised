import { formatDate } from '../../utils/';
import FilterTag from './FilterTag';

const DashboardHeader = ({
  filterDateRange,
  filterOverview,
  setFilterOverview,
  totalBeerCount,
  setFilterDateRange,
  onFilterClick,
}) => {
  const activeFilters = Object.entries(filterOverview).filter(
    ([, value]) => value !== ''
  );

  const handleClearFilter = (key, e) => {
    e.stopPropagation();
    setFilterOverview((prev) => ({ ...prev, [key]: '' }));
  };

  const handleClearDate = (type, e) => {
    e.stopPropagation();
    setFilterDateRange((prev) => ({ ...prev, [type]: '' }));
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
                key={key}
                label={key.replace('_', ' ')}
                value={value}
                onClear={(e) => handleClearFilter(key, e)}
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
