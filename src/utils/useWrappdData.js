import { useMemo } from 'react';
import { getOverviewStats, processTopData } from '.';

import { processTopBeers } from './listProcessing';

export const useWrappdData = (beerData, fullBeerData, filterDateRange, infoToShow) => {
  // Overview stats
  const stats = useMemo(
    () => getOverviewStats(beerData, filterDateRange, fullBeerData, infoToShow, true),
    [beerData, filterDateRange, fullBeerData, infoToShow]
  );

  // Structured top lists
  const topLists = useMemo(
    () => [
      {
        title: 'Top 5 beers',
        items: processTopBeers(beerData, 'rating_score', 25, 'desc').processedList, // fetch a lot to get 5 photos
        valueKey: 'value',
      },
      {
        title: 'Top 5 breweries',
        items: processTopData(beerData, 'brewery_name', '', 5).topItems,
        valueKey: 'count',
        suffix: 'x',
      },
      {
        title: 'Top 5 venues',
        items: processTopData(beerData, 'venue_name', '', 5, true).topItems,
        valueKey: 'count',
        suffix: 'x',
      },
      {
        title: 'Worst 5 beers',
        items: processTopBeers(beerData, 'rating_score', 5, 'asc').processedList,
        valueKey: 'value',
      },
    ],
    [beerData]
  );

  return { stats, topLists };
};
