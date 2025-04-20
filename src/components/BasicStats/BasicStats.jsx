import PropTypes from 'prop-types';
import StatCard from './StatCard';
import WrappdButton from '../Wrappd/WrappdButton';
import { useWrappdData } from '../../utils';

const BasicStats = ({ beerData, fullBeerData, filterDateRange }) => {
  const infoToShow = [
    'Total beers',
    'Unique beers',
    'Total breweries',
    'Beer styles',
    'Photos added',
    'Toasts received',
    'Comments received',
    'Venues drank at',
    'Venues purchased',
    'Cities drank in',
    'Countries drank in',
    'Brewery countries',
    'Unique friends',
    'Years active',
    'Days active',
    'Average rating',
  ];

  const { stats, topLists } = useWrappdData(
    beerData,
    fullBeerData,
    filterDateRange,
    infoToShow
  );

  return (
    <div>
      <WrappdButton stats={stats} filterDateRange={filterDateRange} topLists={topLists} />
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
  beerData: PropTypes.array.isRequired,
  fullBeerData: PropTypes.array.isRequired,
  filterDateRange: PropTypes.object.isRequired,
};

export default BasicStats;
