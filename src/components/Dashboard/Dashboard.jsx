import { useState, useEffect, useContext, lazy, Suspense } from 'react';
import ReactGA from 'react-ga4';
import { Link } from 'react-router-dom';

import DashboardHeader from './DashboardHeader.jsx';
import YearFilterButtons from './YearFilterButtons.jsx';
import DateSelector from './DateSelector.jsx';
import OverviewFilters from '../Overview/OverviewFilters.jsx';
import { DataContext } from '../../DataContext';
import { filterBeerData, getDefaultStartDate, getDefaultEndDate } from '../../utils/';

// Lazy-load heavy components
const BasicStats = lazy(() => import('../BasicStats/BasicStats.jsx'));
const PieChartList = lazy(() => import('../Charts/PieChartList.jsx'));
const BarChartList = lazy(() => import('../Charts/BarChartList.jsx'));
const TopTableList = lazy(() => import('../TopTableList/TopTableList.jsx'));
const LineChart = lazy(() => import('../Charts/LineChart.jsx'));
const VenueMap = lazy(() => import('../Maps/VenueMap.jsx'));
const BreweryMap = lazy(() => import('../Maps/BreweryMap.jsx'));
const BeerTypeChart = lazy(() => import('../Charts/BeerTypeChart/BeerTypeChart.jsx'));
const Overview = lazy(() => import('../Overview/Overview.jsx'));

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
    beer_type: '',
  });
  const [filterDateRange, setFilterDateRange] = useState({
    start: getDefaultStartDate(),
    end: getDefaultEndDate(),
  });

  const { beerData } = useContext(DataContext);

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
      page: '/dashboard',
      title: 'Dashboard',
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

  const [activeSection, setActiveSection] = useState('stats');

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

          {/* Section Buttons */}
          <div className="my-4 flex flex-wrap gap-4">
            <button
              onClick={() => setActiveSection('stats')}
              className={`mb-0 rounded border px-3 py-2 text-lg shadow transition-colors duration-300 ${
                activeSection === 'stats'
                  ? 'border-yellow-500 bg-yellow-500 text-gray-900'
                  : 'bg-gray-900 text-white hover:bg-gray-700'
              }`}
            >
              Show Stats
            </button>
            <button
              onClick={() => setActiveSection('charts')}
              className={`mb-0 rounded border px-3 py-2 text-lg shadow transition-colors duration-300 ${
                activeSection === 'charts'
                  ? 'border-yellow-500 bg-yellow-500 text-gray-900'
                  : 'bg-gray-900 text-white hover:bg-gray-700'
              }`}
            >
              Show Charts
            </button>
            <button
              onClick={() => setActiveSection('maps')}
              className={`mb-0 rounded border px-3 py-2 text-lg shadow transition-colors duration-300 ${
                activeSection === 'maps'
                  ? 'border-yellow-500 bg-yellow-500 text-gray-900'
                  : 'bg-gray-900 text-white hover:bg-gray-700'
              }`}
            >
              Show Maps
            </button>
            <button
              onClick={() => setActiveSection('checkins')}
              className={`mb-0 rounded border px-3 py-2 text-lg shadow transition-colors duration-300 ${
                activeSection === 'checkins'
                  ? 'border-yellow-500 bg-yellow-500 text-gray-900'
                  : 'bg-gray-900 text-white hover:bg-gray-700'
              }`}
            >
              Show Checkins
            </button>
          </div>

          {/* Conditional Loading */}
          <div className="grid gap-6 rounded md:py-4 lg:grid-cols-2 lg:gap-10 lg:gap-y-24 xl:py-6">
            <Suspense fallback={<div>Loading...</div>}>
              {activeSection === 'stats' && (
                <>
                  <BasicStats
                    beerData={filteredData}
                    fullBeerData={beerData}
                    filterDateRange={filterDateRange}
                  />
                  <TopTableList beerData={filteredData} />
                </>
              )}
              {activeSection === 'charts' && (
                <>
                  <PieChartList beerData={filteredData} />
                  <BarChartList beerData={filteredData} />
                  <LineChart beerData={filteredData} />
                  <BeerTypeChart beerData={filteredData} />
                </>
              )}
              {activeSection === 'maps' && (
                <>
                  <VenueMap beerData={filteredData} />
                  <BreweryMap beerData={filteredData} />
                </>
              )}
              {activeSection === 'checkins' && (
                <div className="lg:col-span-2">
                  <Overview beerData={filteredData} />
                </div>
              )}
            </Suspense>
          </div>
        </div>
      ) : (
        <div className="mt-4 text-center text-xl">
          Loading results or your filters didn't return a result. Did you already{' '}
          <Link className="text-yellow-500 underline" to="/upload">
            upload your Untappd JSON export
          </Link>
          ?
        </div>
      )}
    </div>
  );
};

export default Dashboard;
