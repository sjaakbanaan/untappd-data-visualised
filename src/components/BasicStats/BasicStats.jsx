import PropTypes from 'prop-types';
import StatCard from './StatCard';
import { useBasicStats } from '../../utils/';

const BasicStats = ({ filteredData, filterDateRange }) => {
  const { stats } = useBasicStats(filteredData, filterDateRange);

  return (
    <div>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {stats.length > 0 &&
          stats.map(
            (item, i) =>
              !item.hide && (
                <StatCard
                  key={i}
                  statKey={item.key}
                  value={item.value}
                  suffix={item.suffix}
                />
              )
          )}
      </ul>
    </div>
  );
};

BasicStats.propTypes = {
  filteredData: PropTypes.array.isRequired,
  filterDateRange: PropTypes.object.isRequired,
};

export default BasicStats;
