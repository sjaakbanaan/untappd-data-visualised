import Icon from '../UI/Icon/Icon';
import { formatDate } from '../../utils/';

const DashboardHeader = ({
  filterDateRange,
  filterOverview,
  setFilterOverview,
  totalBeerCount,
  setFilterDateRange,
  onFilterClick,
}) => {
  const activeFilters = Object.entries(filterOverview).filter(
    ([key, value]) => value !== ''
  );

  const handleClearFilter = (key, e) => {
    e.stopPropagation();
    setFilterOverview((prev) => ({ ...prev, [key]: '' }));
  };

  const handleClearDate = (type, e) => {
    e.stopPropagation();
    setFilterDateRange((prev) => ({ ...prev, [type]: '' }));
  };

  const FilterTag = ({ label, value, onClear, onClick, isPlaceholder }) => (
    <span
      onClick={onClick}
      className="flex items-center gap-1 cursor-pointer whitespace-nowrap rounded border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 text-sm font-normal text-yellow-500 transition-colors hover:bg-yellow-500/20"
    >
      {label && <span className="text-gray-400">{label}:</span>}
      {isPlaceholder ? '[...]' : value}
      {onClear && !isPlaceholder && (
        <span
          onClick={onClear}
          className="ml-1 flex items-center justify-center rounded-full p-0.5 transition-transform duration-300 hover:rotate-90"
        >
          <Icon icon="CLOSE" className="w-2 fill-yellow-500" />
        </span>
      )}
    </span>
  );

  return (
    <div className="md:flex border-yellow-500 border md:items-center md:justify-center mb-6 md:mb-10 py-6 rounded-lg px-4">
      <h2 className="flex flex-wrap items-center justify-center gap-2 text-center text-2xl md:text-3xl font-bold md:my-3">
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
