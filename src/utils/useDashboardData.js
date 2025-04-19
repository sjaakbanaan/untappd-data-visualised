import { useState, useEffect, useContext } from 'react';

import { DataContext } from '../DataContext';
import { filterBeerData, getDefaultStartDate, getDefaultEndDate } from '.';

export const useDashboardData = () => {
  // BEHOLD! THE ALMIGHTHY BEER DATA!
  const { beerData, resetList } = useContext(DataContext);

  // prepare the useStates for the incoming data:
  const [filteredData, setFilteredData] = useState([]);
  const [filterOverview, setFilterOverview] = useState(resetList);
  const [filterDateRange, setFilterDateRange] = useState({
    start: getDefaultStartDate(),
    end: getDefaultEndDate(),
  });

  /* The filtering starts here whenever you change a filter. It returns pretty much all
  the date needed for components: */
  useEffect(() => {
    if (beerData) {
      const filteredResults = filterBeerData(
        beerData,
        filterOverview,
        filterDateRange,
        resetList
      );
      setFilteredData(filteredResults);
    }
  }, [beerData, filterOverview, filterDateRange, resetList]);

  return {
    beerData,
    filteredData,
    filterOverview,
    setFilterOverview,
    filterDateRange,
    setFilterDateRange,
  };
};
