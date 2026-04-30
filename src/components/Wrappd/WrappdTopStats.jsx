import PropTypes from 'prop-types';

const WrappdTopStats = ({ title, items, valueKey = 'value', suffix = '' }) => {
  if (!items || items.length === 0) return null;

  return (
    <div>
      <div className="mb-4 text-lg font-bold text-wrappdYellow">{title}</div>
      <ol className="space-y-2">
        {items.map((item, i) => (
          <li key={i}>
            <div className="flex flex-row items-center justify-between gap-3">
              {/* Rank badge */}
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-gray-400">
                {i + 1}
              </span>

              {/* Name */}
              <div className="min-w-0 flex-1 truncate text-sm">
                {item.url ? (
                  <a
                    href={item.url}
                    title={`See checkin for ${item.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-wrappdYellow hover:underline"
                  >
                    {item.name}
                  </a>
                ) : (
                  item.name
                )}
              </div>

              {/* Value badge */}
              <div className="shrink-0 rounded-lg bg-wrappdYellow px-2.5 py-0.5 text-center text-sm font-bold leading-none text-black">
                {item[valueKey]}
                {suffix}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

WrappdTopStats.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  valueKey: PropTypes.string,
  suffix: PropTypes.string,
};

export default WrappdTopStats;
