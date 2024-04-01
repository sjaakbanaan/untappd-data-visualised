import { useState, useEffect } from 'react';
import VenueMap from './VenueMap.jsx';
import BreweryMap from './BreweryMap.jsx';
import TopTableList from './TopTableList/TopTableList.jsx';
import Overview from './Overview/Overview.jsx';
import OverviewFilters from './Overview/OverviewFilters.jsx';
import PieChartList from './Charts/PieChartList.jsx';
import BarChartList from './Charts/BarChartList.jsx';
import LineChart from './Charts/LineChart.jsx';
import DateSelector from './DateSelector/DateSelector.jsx';
import YearFilterButtons from './YearFilterButtons.jsx';
import DashboardHeader from './DashboardHeader.jsx';
import BeerTypeChart from './Charts/BeerTypeChart/BeerTypeChart.jsx';

import {
  filterBeerData,
  getDefaultStartDate,
  getDefaultEndDate,
  fetchData,
} from '../utils/';

const useDashboardData = () => {
  const [beerData, setBeerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOverview, setFilterOverview] = useState({
    brewery_name: '',
    venue_country: '',
    venue_city: '',
    venue_name: '',
    brewery_country: '',
  });
  const [filterDateRange, setFilterDateRange] = useState({
    start: getDefaultStartDate(),
    end: getDefaultEndDate(),
  });

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      const data = await fetchData('/beers-processed.json');
      if (data) {
        setBeerData(data);
        setFilteredData(); // Initial load without filters
      }
    };

    fetchDataAndSetState();
  }, []);

  useEffect(() => {
    const filteredResults = filterBeerData(beerData, filterOverview, filterDateRange);
    setFilteredData(filteredResults);
  }, [beerData, filterOverview, filterDateRange]);

  return {
    beerData,
    filteredData,
    filterOverview,
    setFilterOverview,
    filterDateRange,
    setFilterDateRange,
  };
};

const Dashboard = () => {
  const {
    beerData,
    filteredData,
    filterOverview,
    setFilterOverview,
    filterDateRange,
    setFilterDateRange,
  } = useDashboardData();

  return (
    <>
      <DateSelector
        beerData={beerData}
        filterDateRange={filterDateRange}
        setFilterDateRange={setFilterDateRange}
      />
      {filteredData && filteredData?.length > 0 ? (
        <>
          <div className="rounded shadow-md">
            <YearFilterButtons
              beerData={beerData}
              filterDateRange={filterDateRange}
              setFilterDateRange={setFilterDateRange}
            />
            <OverviewFilters
              beerData={filteredData}
              filterOverview={filterOverview}
              setFilterOverview={setFilterOverview}
            />
            <DashboardHeader
              totalBeerCount={filteredData && filteredData?.length}
              filterDateRange={filterDateRange}
              beerData={filteredData}
              filterOverview={filterOverview}
              setFilterOverview={setFilterOverview}
            />
            <div className="container mx-auto mt-4 p-2 p-md-8 bg-gray-800 rounded shadow-md">
              <div className="grid lg:grid-cols-2 gap-8 text-white">
                <PieChartList beerData={filteredData} />
                <BarChartList beerData={filteredData} />
                <TopTableList beerData={filteredData} />
                <LineChart beerData={filteredData} />
                <VenueMap beerData={filteredData} />
                <BreweryMap beerData={filteredData} />
              </div>
              <BeerTypeChart beerData={filteredData} />
            </div>
          </div>
          <Overview beerData={filteredData} />
        </>
      ) : (
        <div className="mt-4">
          Loading results or your filters didn't return a result.
        </div>
      )}
    </>
  );
};

export default Dashboard;
