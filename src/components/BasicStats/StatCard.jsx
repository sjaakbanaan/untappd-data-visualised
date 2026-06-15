import PropTypes from 'prop-types';

const formatValue = (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const getNumericValue = (value) => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null;
  if (typeof value !== 'string') return null;

  const normalized = Number(value.replace('%', ''));
  return Number.isFinite(normalized) ? normalized : null;
};

const formatDelta = (value, comparisonValue) => {
  const current = getNumericValue(value);
  const comparison = getNumericValue(comparisonValue);

  if (current === null || comparison === null) return null;

  const delta = current - comparison;
  if (delta === 0) return 'same';

  const sign = delta > 0 ? '+' : '';
  const decimals = Number.isInteger(delta) ? 0 : 2;

  return `${sign}${delta.toFixed(decimals)}`;
};

const StatCard = ({ statKey, value, suffix, suffixLink, comparison }) => {
  const delta = comparison ? formatDelta(value, comparison.value) : null;

  return (
    <li
      key={statKey}
      className="block overflow-hidden bg-gray-800 p-4 shadow-lg transition-transform duration-300 hover:scale-110 md:rounded-lg"
    >
      <div className="flex h-full flex-col text-center text-xl">
        <div className="mb-2 text-balance font-bold">{statKey}</div>
        <div className="flex min-h-24 flex-1 flex-col items-center justify-center gap-2 whitespace-nowrap">
          <div className="text-4xl font-extrabold text-yellow-500">
            {formatValue(value)}
          </div>
          {suffix && (
            <div className="flex justify-center text-sm text-gray-500">
              {suffixLink ? (
                <a
                  href={suffixLink}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-yellow-400"
                >
                  {suffix}
                </a>
              ) : (
                <span>{suffix}</span>
              )}
            </div>
          )}
        </div>

        {comparison && (
          <div className="mt-auto border-t border-gray-700 pt-3 text-sm">
            <div className="flex items-center justify-between gap-3 text-left">
              <span className="min-w-0 truncate text-gray-400">
                {comparison.username}
              </span>
              <span className="shrink-0 font-bold text-white">
                {formatValue(comparison.value)}
              </span>
            </div>
            {comparison.suffix && (
              <div className="mt-1 truncate text-right text-xs text-gray-500">
                {comparison.suffix}
              </div>
            )}
            {delta && (
              <div
                className={`mt-2 text-right text-xs font-bold ${
                  delta.startsWith('+')
                    ? 'text-green-400'
                    : delta === 'same'
                      ? 'text-gray-500'
                      : 'text-red-400'
                }`}
              >
                {delta === 'same' ? 'same as you' : `${delta} vs you`}
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

StatCard.propTypes = {
  statKey: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  suffix: PropTypes.string,
  suffixLink: PropTypes.string,
  comparison: PropTypes.shape({
    username: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    suffix: PropTypes.string,
  }),
};

export default StatCard;
