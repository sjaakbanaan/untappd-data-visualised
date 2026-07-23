import { useState, useEffect, useContext } from 'react';

import { DataContext } from '../DataContext';
import { filterBeerData } from '.';

export const useDashboardData = () => {
  // BEHOLD! THE ALMIGHTHY BEER DATA!
  const {
    beerData,
    resetList,
    dataLoading,
    filterDateRange,
    setFilterDateRange,
    filterOverview,
    setFilterOverview,
    filterYears,
    setFilterYears,
    isFilterSidebarOpen,
    setIsFilterSidebarOpen,
  } = useContext(DataContext);

  // prepare the useStates for the incoming data:
  const [filteredData, setFilteredData] = useState([]);

  /* The filtering starts here whenever you change a filter. It returns pretty much all
  the date needed for components: */
  useEffect(() => {
    if (beerData) {
      const filteredResults = filterBeerData(
        beerData,
        filterOverview,
        filterDateRange,
        resetList,
        filterYears
      );
      setFilteredData(filteredResults);
    }
  }, [beerData, filterOverview, filterDateRange, resetList, filterYears]);

  return {
    beerData,
    filteredData,
    filterOverview,
    setFilterOverview,
    filterDateRange,
    setFilterDateRange,
    filterYears,
    setFilterYears,
    isFilterSidebarOpen,
    setIsFilterSidebarOpen,
    dataLoading,
  };
};
