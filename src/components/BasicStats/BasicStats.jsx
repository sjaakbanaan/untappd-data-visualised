import PropTypes from 'prop-types';
import { getOverviewStats } from '../../utils';

const BasicStats = ({ beerData, fullBeerData, filterDateRange }) => {
  const infoToShow = [
    'Years active',
    'Days active',
    'Total beers',
    'Total unique beers',
    'Different beer styles',
    'Total photos added',
    'Total toasts received',
    'Total comments received',
    'Total venues drank at',
    'Total venues purchased from',
    'Total cities drank in',
    'Total countries drank in',
    'Total brewery countries',
    'Total unique friends',
  ];

  const stats = getOverviewStats(beerData, filterDateRange, fullBeerData, infoToShow);

  return (
    <div className="p-4">
      <h2 className="mb-6 text-lg font-semibold">Basic statistics</h2>
      <ul className="divide-y divide-gray-700">
        {stats.length > 0 &&
          stats.map(
            (item, i) =>
              !item.hide && (
                <li key={i} className="py-2">
                  <div className="flex items-center justify-between">
                    {item.key}
                    <span className="whitespace-nowrap text-gray-400">{item.value}</span>
                  </div>
                </li>
              )
          )}
      </ul>
    </div>
  );
};

BasicStats.propTypes = {
  beerData: PropTypes.array.isRequired,
  fullBeerData: PropTypes.array.isRequired,
};

export default BasicStats;
