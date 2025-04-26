import PropTypes from 'prop-types';

const WrappdStats = ({ stats, dateRange }) => {
  const totalDays =
    dateRange &&
    (new Date(dateRange.end) - new Date(dateRange.start)) / (1000 * 60 * 60 * 24);

  return (
    <div className="mb-10 grid grid-cols-2 gap-4 text-xl md:grid-flow-col">
      {stats.length > 0 &&
        stats
          .filter((item) =>
            ['Total beers', 'Unique beers', 'Beer styles', 'Venues drank at'].includes(
              item.key
            )
          )
          .map(
            (item, i) =>
              !item.hide &&
              !item.topList && (
                <div
                  key={i}
                  className="flex flex-col justify-between rounded-md border border-wrappdYellow p-3"
                >
                  <div className="mt-0 text-xl md:text-2xl">
                    {item.short_key || item.key}
                  </div>
                  <div className="-mt-2 flex items-center">
                    <span className="text-nowrap text-3xl font-bold leading-none text-wrappdYellow  md:text-4xl">
                      {item.value}
                    </span>
                    {item.key === 'Total beers' && (
                      <span className="ml-2 mt-2 flex text-xs leading-none text-gray-400">
                        {(item.value / totalDays).toFixed(2)}
                        <br /> per day
                      </span>
                    )}
                  </div>
                </div>
              )
          )}
    </div>
  );
};

WrappdStats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      short_key: PropTypes.string,
      hide: PropTypes.bool,
      topList: PropTypes.bool,
    })
  ).isRequired,
};

export default WrappdStats;
