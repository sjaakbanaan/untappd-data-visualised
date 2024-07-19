import { useState, useEffect, useContext } from 'react';
import ReactGA from 'react-ga4';

import { Link } from 'react-router-dom';
import VenueMap from '../Maps/VenueMap.jsx';
import BreweryMap from '../Maps/BreweryMap.jsx';
import TopTableList from '../TopTableList/TopTableList.jsx';
import Overview from '../Overview/Overview.jsx';
import OverviewFilters from '../Overview/OverviewFilters.jsx';
import PieChartList from '../Charts/PieChartList.jsx';
import BarChartList from '../Charts/BarChartList.jsx';
import LineChart from '../Charts/LineChart.jsx';
import BasicStats from '../BasicStats/BasicStats.jsx';
import DateSelector from './DateSelector.jsx';
import YearFilterButtons from './YearFilterButtons.jsx';
import DashboardHeader from './DashboardHeader.jsx';
import BeerTypeChart from '../Charts/BeerTypeChart/BeerTypeChart.jsx';

import { filterBeerData, getDefaultStartDate, getDefaultEndDate } from '../../utils/';

// Import the context where beerData is stored
import { DataContext } from '../../DataContext';

const useDashboardData = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filterOverview, setFilterOverview] = useState({
    brewery_name: '',
    brewery_city: '',
    brewery_country: '',
    venue_name: '',
    venue_city: '',
    venue_country: '',
    tagged_friends: '',
  });
  const [filterDateRange, setFilterDateRange] = useState({
    start: getDefaultStartDate(),
    end: getDefaultEndDate(),
  });

  // Access beerData from context
  const { beerData } = useContext(DataContext);
  // console.log('data', beerData);

  useEffect(() => {
    if (beerData) {
      const filteredResults = filterBeerData(beerData, filterOverview, filterDateRange);
      setFilteredData(filteredResults);
    }
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
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/uploader',
      title: 'Uploader',
    });
  });

  const {
    beerData,
    filteredData,
    filterOverview,
    setFilterOverview,
    filterDateRange,
    setFilterDateRange,
  } = useDashboardData();

  return (
    <div className="container mx-auto p-4 md:p-0">
      {filteredData && filteredData.length > 0 ? (
        <div>
          <YearFilterButtons
            beerData={beerData}
            filterDateRange={filterDateRange}
            setFilterDateRange={setFilterDateRange}
          />
          <DateSelector
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
            totalBeerCount={filteredData.length}
            filterDateRange={filterDateRange}
            filterOverview={filterOverview}
            beerData={filteredData}
            setFilterOverview={setFilterOverview}
          />
          <div className="rounded bg-gray-800 p-2 shadow-md md:p-8">
            <div className="grid gap-8 text-white lg:grid-cols-2">
              <BasicStats
                beerData={filteredData}
                fullBeerData={beerData}
                filterDateRange={filterDateRange}
              />
              <PieChartList beerData={filteredData} />
              <BarChartList beerData={filteredData} />
              <TopTableList beerData={filteredData} />
              <LineChart beerData={filteredData} />
              <VenueMap beerData={filteredData} />
              <BreweryMap beerData={filteredData} />
            </div>
            <BeerTypeChart beerData={filteredData} />
          </div>
          <Overview beerData={filteredData} />
        </div>
      ) : (
        <div className="mt-4">
          Loading results or your filters didn't return a result. Did you already{' '}
          <Link className="text-yellow-500 underline" to="/upload">
            upload your Untappd JSON export?
          </Link>
          ?
        </div>
      )}
    </div>
  );
};

export default Dashboard;
