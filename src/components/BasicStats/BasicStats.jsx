import PropTypes from 'prop-types';
import StatCard from './StatCard';
import CardCarousel from '../UI/CardCarousel';
import { useBasicStats } from '../../utils/';

const BasicStats = ({ filteredData, filterDateRange, fullBeerData }) => {
  const { stats } = useBasicStats(filteredData, filterDateRange, fullBeerData);
  const visibleStats = stats.filter((item) => !item.hide);

  if (visibleStats.length === 0) return null;

  return (
    <CardCarousel cardSelector=".carousel-card">
      {visibleStats.map((item, i) => (
        <StatCard
          key={i}
          statKey={item.key}
          value={item.value}
          suffix={item.suffix}
          suffixLink={item.suffixLink}
        />
      ))}
    </CardCarousel>
  );
};

BasicStats.propTypes = {
  filteredData: PropTypes.array.isRequired,
  filterDateRange: PropTypes.object.isRequired,
  fullBeerData: PropTypes.array.isRequired,
};

export default BasicStats;
