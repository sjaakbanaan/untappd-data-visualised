import {
  filterDuplicateBeers,
  getBarChartTopBottomData,
  statsCountTotal,
  statsCountUnique,
  statsCountUniqueFriends,
  checkFullDateRange,
  getDefaultEndDate,
} from '../utils';

export const getOverviewStats = (beerData, filterDateRange, fullBeerData, infoToShow) => {
  const totalUniqueBeerCount = beerData && filterDuplicateBeers(beerData)?.length;
  const totalDays =
    filterDateRange &&
    (new Date(filterDateRange.end) - new Date(filterDateRange.start)) /
      (1000 * 60 * 60 * 24);

  const totalPhotos = statsCountTotal(beerData, 'photo_url');
  const totalVenues = statsCountTotal(beerData, 'venue_name');
  const totalCities = statsCountUnique(beerData, 'venue_city');
  const totalBreweries = statsCountUnique(beerData, 'brewery_name');
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

  const stats = [
    {
      key: 'Total beers',
      value: beerData.length,
      suffix: `${(beerData.length / totalDays).toFixed(2)} per day`,
    },
    {
      key: 'Unique beers',
      short_key: 'Unique beers',
      value: totalUniqueBeerCount,
      suffix: `${((totalUniqueBeerCount / beerData.length) * 100).toFixed(1)}%`,
    },
    {
      key: 'Total breweries',
      value: totalBreweries,
    },
    {
      key: 'Beer styles',
      short_key: 'Beer styles',
      value: beerTypes.length,
    },
    {
      key: 'Venues drank at',
      short_key: 'Venues',
      value: totalVenues,
      suffix: `${(totalVenues / beerData.length).toFixed(2)} per checkin`,
    },
    {
      key: 'Venues purchased',
      value: totalVenuesPurchased,
      suffix: `${(totalVenuesPurchased / beerData.length).toFixed(2)} per checkin`,
    },
    {
      key: 'Cities drank in',
      value: totalCities,
    },
    {
      key: 'Countries drank in',
      value: totalCountries,
    },
    {
      key: 'Brewery countries',
      value: totalBreweryCountries,
    },
    {
      key: 'Photos added',
      value: totalPhotos,
      suffix: `${(totalPhotos / beerData.length).toFixed(2)} per checkin`,
    },
    {
      key: 'Toasts received',
      value: totalToasts,
      suffix: `${(totalToasts / beerData.length).toFixed(2)} per checkin`,
    },
    {
      key: 'Comments received',
      value: totalComments,
      suffix: `${(totalComments / beerData.length).toFixed(2)} per checkin`,
    },
    {
      key: 'Total unique friends',
      value: totalUniqueFriends,
    },
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
  ];

  return stats
    .filter((stat) => !stat.hide && infoToShow.includes(stat.key))
    .map(({ key, value, short_key, suffix }) => ({
      key,
      short_key,
      value,
      suffix,
    }));
};
