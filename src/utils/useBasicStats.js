import { useMemo } from 'react';
import { getOverviewStats, processTopData } from '.';
import { processTopBeers } from './listProcessing';

export const useBasicStats = (filteredData, filterDateRange, fullBeerData = null) => {
  const infoToShow = useMemo(
    () => [
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
      'Rating vs. world',
    ],
    []
  );

  // Overview stats
  const stats = useMemo(
    () => getOverviewStats(filteredData, filterDateRange, infoToShow, fullBeerData),
    [filteredData, filterDateRange, infoToShow, fullBeerData]
  );

  // Structured top lists
  const topLists = useMemo(
    () => [
      {
        title: 'Top 5 beers',
        items: processTopBeers(filteredData, 'rating_score', 25, 'desc').processedList, // fetch a lot to get 5 photos
        valueKey: 'value',
      },
      {
        title: 'Top 5 breweries',
        items: processTopData(filteredData, 'brewery_name', '', 5).topItems,
        valueKey: 'count',
        suffix: 'x',
      },
      {
        title: 'Top 5 venues',
        items: processTopData(filteredData, 'venue_name', '', 5, true).topItems,
        valueKey: 'count',
        suffix: 'x',
      },
      {
        title: 'Worst 5 beers',
        items: processTopBeers(filteredData, 'rating_score', 5, 'asc').processedList,
        valueKey: 'value',
      },
    ],
    [filteredData]
  );

  return { stats, topLists };
};
