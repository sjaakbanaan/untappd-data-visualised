import PropTypes from 'prop-types';
import {
  filterDuplicateBeers,
  getBarChartTopBottomData,
  statsCountTotal,
  statsCountUnique,
  statsCountUniqueFriends,
  checkFullDateRange,
  getDefaultEndDate,
} from '../../utils';

const BasicStats = ({ beerData, fullBeerData, filterDateRange }) => {
  const totalUniqueBeerCount = beerData && filterDuplicateBeers(beerData)?.length;

  const totalDays =
    filterDateRange &&
    (new Date(filterDateRange.end) - new Date(filterDateRange.start)) /
      (1000 * 60 * 60 * 24);

  const totalPhotos = statsCountTotal(beerData, 'photo_url');
  const totalVenues = statsCountTotal(beerData, 'venue_name');
  const totalCities = statsCountUnique(beerData, 'venue_city');
  const totalCountries = statsCountUnique(beerData, 'venue_country');
  const totalVenuesPurchased = statsCountUnique(beerData, 'purchase_venue');
  const totalBreweryCountries = statsCountUnique(beerData, 'brewery_country');
  const totalToasts = statsCountTotal(beerData, 'total_toasts', (item) => item !== 0);
  const totalComments = statsCountTotal(beerData, 'total_comments', (item) => item !== 0);
  const totalUniqueFriends = statsCountUniqueFriends(beerData, 'tagged_friends');
  const beerTypes = getBarChartTopBottomData(beerData);
  const fullDateRange = checkFullDateRange(
    getDefaultEndDate(),
    fullBeerData,
    filterDateRange
  );

  const totalAndAvg = (totalVal) => {
    return `${totalVal} (${(totalVal / beerData.length).toFixed(2)} per checkin)`;
  };

  const stats = [
    {
      key: 'Years active',
      value: (totalDays / 365).toFixed(1),
      hide: !fullDateRange[0],
    },
    {
      key: 'Days active',
      value: totalDays,
      hide: !fullDateRange[0],
    },
    {
      key: 'Total beers',
      value: `${beerData.length} (${(beerData.length / totalDays).toFixed(2)} per day)`,
    },
    {
      key: 'Total unique beers',
      value: `${totalUniqueBeerCount} (${((totalUniqueBeerCount / beerData.length) * 100).toFixed(1)}%)`,
    },
    {
      key: 'Different beer styles',
      value: beerTypes.length,
    },
    {
      key: 'Total photos',
      value: totalAndAvg(totalPhotos),
    },
    {
      key: 'Total toasts',
      value: totalAndAvg(totalToasts),
    },
    {
      key: 'Total comments',
      value: totalAndAvg(totalComments),
    },
    {
      key: 'Total venues drank at',
      value: totalAndAvg(totalVenues),
    },
    {
      key: 'Total venues purchased from',
      value: totalAndAvg(totalVenuesPurchased),
    },
    {
      key: 'Total cities drank in',
      value: `${totalCities}`,
    },
    {
      key: 'Total countries drank in',
      value: `${totalCountries}`,
    },
    {
      key: 'Total brewery countries',
      value: `${totalBreweryCountries}`,
    },
    {
      key: 'Total unique friends',
      value: totalUniqueFriends,
    },
  ];

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
