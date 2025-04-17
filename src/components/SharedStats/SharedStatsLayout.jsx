import PropTypes from 'prop-types';
import StatCard from '../StatCard/StatCard';
import { formatWrappdDates } from '../../utils';

const SharedStatsLayout = ({ userName, dateRange, stats }) => {
  return (
    <div className="container max-w-[1024px] mx-auto p-4 md:p-0 my-8">
      <h1 className="mb-4 text-center text-4xl font-bold text-yellow-500">{userName}</h1>
      {dateRange.start && dateRange.end && (
        <h2 className="mb-12 text-center text-2xl font-bold text-white">
          {formatWrappdDates(dateRange.start, dateRange.end)}
        </h2>
      )}
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {stats.map((item, i) => (
          <StatCard key={i} statKey={item.key} value={item.value} suffix={item.suffix} />
        ))}
      </ul>
      <div className="my-5 p-3 text-center text-yellow-500 md:my-10">
        Created your own on{' '}
        <a href="https://tapped.online" target="_blank" rel="noreferrer">
          tapped.online
        </a>
        <div className="pt-1 text-gray-400">powered by Untappd</div>
      </div>
    </div>
  );
};

SharedStatsLayout.propTypes = {
  userName: PropTypes.string.isRequired,
  dateRange: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }).isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      suffix: PropTypes.string,
    })
  ).isRequired,
};

export default SharedStatsLayout;
