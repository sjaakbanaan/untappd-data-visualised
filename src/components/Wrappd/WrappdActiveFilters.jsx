import PropTypes from 'prop-types';
import statesData from '../../data/states.json';
import { formatWrappdDates } from '../../utils/';

// Translate two-letter state codes to full names for display
const translateState = (stateCode) => {
  const state = statesData.find((s) => s.code === stateCode);
  return state ? state.name : stateCode;
};

// "2022, 2023 & 2025" — used instead of the date range when the Wrappd was
// generated from a (possibly non-contiguous) year selection
const formatYearsList = (years) => {
  const sorted = [...years].sort((a, b) => a - b);
  if (sorted.length === 1) return `${sorted[0]}`;
  return `${sorted.slice(0, -1).join(', ')} & ${sorted.at(-1)}`;
};

/**
 * A single filter block: bold value(s) with a small uppercase label,
 * matching the stat block styling.
 */
const FilterBlock = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-lg font-bold leading-tight text-white md:text-xl">
      {value}
    </span>
    <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
      {label}
    </span>
  </div>
);

FilterBlock.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

/**
 * Overview of the period and filters a Wrappd was generated with.
 * Shows the year selection (when present) or the date range as the first
 * block, followed by one block per active filter. Tolerates the old share
 * format where filter values were plain strings.
 */
const WrappdActiveFilters = ({ filterOverview, dateRange, filterYears = [] }) => {
  const activeFilters = Object.entries(filterOverview || {})
    .map(([key, value]) => {
      const values = (Array.isArray(value) ? value : value ? [value] : []).map((v) =>
        key === 'brewery_state' ? translateState(v) : v
      );
      return { key, values };
    })
    .filter(({ values }) => values.length > 0);

  return (
    <div className="mt-6 flex max-w-xl flex-wrap gap-x-10 gap-y-5">
      {filterYears.length > 0 ? (
        <FilterBlock
          label={filterYears.length === 1 ? 'year' : 'years'}
          value={formatYearsList(filterYears)}
        />
      ) : (
        <FilterBlock
          label="date range"
          value={formatWrappdDates(dateRange.start, dateRange.end)}
        />
      )}
      {activeFilters.map(({ key, values }) => (
        <FilterBlock
          key={key}
          label={key.replace(/_/g, ' ')}
          value={values.join(', ')}
        />
      ))}
    </div>
  );
};

WrappdActiveFilters.propTypes = {
  filterOverview: PropTypes.object,
  dateRange: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }).isRequired,
  filterYears: PropTypes.arrayOf(PropTypes.number),
};

export default WrappdActiveFilters;
