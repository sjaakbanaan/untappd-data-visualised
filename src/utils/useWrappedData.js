import { useMemo } from 'react';
import { getOverviewStats, processTopData } from '.';

import { processTopBeers } from './listProcessing';

export const useWrappedData = (beerData, fullBeerData, filterDateRange) => {
  const infoToShow = useMemo(
    () => [
      'Total beers',
      'Total unique beers',
      'Different beer styles',
      'Total venues drank at',
    ],
    []
  );

  // Overview stats
  const stats = useMemo(
    () => getOverviewStats(beerData, filterDateRange, fullBeerData, infoToShow, true),
    [beerData, filterDateRange, fullBeerData, infoToShow]
  );

  // Structured top lists
  const topLists = useMemo(
    () => [
      {
        title: 'Top 5 beers (by rating)',
        items: processTopBeers(beerData, 'rating_score', 5, 'asc').processedList,
        valueKey: 'value',
      },
      {
        title: 'Worst 5 beers (by rating)',
        items: processTopBeers(beerData, 'rating_score', 5, 'desc').processedList,
        valueKey: 'value',
      },
      {
        title: 'Top 5 breweries (by total)',
        items: processTopData(beerData, 'brewery_name', '', 5).topItems,
        valueKey: 'count',
        suffix: 'x',
      },
      {
        title: 'Top 5 venues (home excl.)',
        items: processTopData(beerData, 'venue_name', '', 5, true).topItems,
        valueKey: 'count',
        suffix: 'x',
      },
    ],
    [beerData]
  );

  return { stats, topLists };
};
