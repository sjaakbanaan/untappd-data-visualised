import {
  filterDuplicateBeers,
  getBarChartTopBottomData,
  statsCountTotal,
  statsCountUnique,
  statsCountUniqueFriends,
  checkFullDateRange,
  getDefaultEndDate,
} from '../utils';
import { calculateAverageRatingScore } from './getBarChartTopBottomData';

export const getOverviewStats = (filteredData, filterDateRange, infoToShow) => {
  const totalUniqueBeerCount = filteredData && filterDuplicateBeers(filteredData)?.length;
  const totalDays =
    filterDateRange &&
    (new Date(filterDateRange.end) - new Date(filterDateRange.start)) /
      (1000 * 60 * 60 * 24);

  const totalPhotos = statsCountTotal(filteredData, 'photo_url');
  const totalVenues = statsCountUnique(filteredData, 'venue_name');
  const totalCities = statsCountUnique(filteredData, 'venue_city');
  const totalBreweries = statsCountUnique(filteredData, 'brewery_name');
  const totalCountries = statsCountUnique(filteredData, 'venue_country');
  const totalVenuesPurchased = statsCountUnique(filteredData, 'purchase_venue');
  const totalBreweryCountries = statsCountUnique(filteredData, 'brewery_country');
  const totalToasts = statsCountTotal(filteredData, 'total_toasts', (item) => item !== 0);
  const totalComments = statsCountTotal(
    filteredData,
    'total_comments',
    (item) => item !== 0
  );
  const totalUniqueFriends = statsCountUniqueFriends(filteredData, 'tagged_friends');
  const beerTypes = getBarChartTopBottomData(filteredData);
  const fullDateRange = checkFullDateRange(
    getDefaultEndDate(),
    filteredData,
    filterDateRange
  );
  const avgRating = calculateAverageRatingScore(filteredData);
  const globalAvgRating = calculateAverageRatingScore(
    filteredData,
    'global_rating_score'
  );

  const stats = [
    {
      key: 'Total beers',
      value: filteredData.length,
      suffix: `${(filteredData.length / totalDays).toFixed(2)} per day`,
    },
    {
      key: 'Unique beers',
      short_key: 'Unique beers',
      value: totalUniqueBeerCount,
      suffix: `${((totalUniqueBeerCount / filteredData.length) * 100).toFixed(1)}%`,
    },
    {
      key: 'Total breweries',
      value: totalBreweries,
    },
    {
      key: 'Beer styles',
      value: beerTypes.length,
    },
    {
      key: 'Average rating',
      value: (avgRating / 100).toFixed(2),
      suffix: `global rating: ${(globalAvgRating / 100).toFixed(2)}`,
    },
    {
      key: 'Venues drank at',
      short_key: 'Venues',
      value: totalVenues,
      suffix: `${(totalVenues / filteredData.length).toFixed(2)} per checkin`,
    },
    {
      key: 'Venues purchased',
      value: totalVenuesPurchased,
      suffix: `${(totalVenuesPurchased / filteredData.length).toFixed(2)} per checkin`,
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
      suffix: `${(totalPhotos / filteredData.length).toFixed(2)} per checkin`,
    },
    {
      key: 'Toasts received',
      value: totalToasts,
      suffix: `${(totalToasts / filteredData.length).toFixed(2)} per checkin`,
    },
    {
      key: 'Comments received',
      value: totalComments,
      suffix: `${(totalComments / filteredData.length).toFixed(2)} per checkin`,
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
