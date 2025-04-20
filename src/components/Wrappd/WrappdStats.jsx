import PropTypes from 'prop-types';

const WrappdStats = ({ stats }) => {
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
                  <div className="-mt-2 text-3xl font-bold text-wrappdYellow md:text-4xl">
                    {item.value}
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
