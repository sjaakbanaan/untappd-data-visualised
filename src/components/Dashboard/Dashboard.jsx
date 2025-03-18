import { useState, useEffect, useContext, lazy, Suspense } from 'react';
import ReactGA from 'react-ga4';

import DashboardHeader from './DashboardHeader.jsx';
import YearFilterButtons from './YearFilterButtons.jsx';
import DateSelector from './DateSelector.jsx';
import OverviewFilters from '../Overview/OverviewFilters.jsx';
import { DataContext } from '../../DataContext';
import { filterBeerData, getDefaultStartDate, getDefaultEndDate } from '../../utils/';
import NotificationBar from '../NotificationBar.jsx';
import DashboardNav from './DashboardNav.jsx';

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
  // prepare the useStates for the incoming data:
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

  // BEHOLD! THE ALMIGHTHY BEER DATA!
  const { beerData } = useContext(DataContext);

  /* The filtering starts here whenever you change a filter. It returns pretty much all
  the date needed for components: */
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
  // analytics
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/dashboard',
      title: 'Dashboard',
    });
  });

  // let's fetch all that nice data via the useDashboardData() hook:
  const {
    beerData,
    filteredData,
    filterOverview,
    setFilterOverview,
    filterDateRange,
    setFilterDateRange,
  } = useDashboardData();

  // set a default active dashboard menu item:
  const [activeSection, setActiveSection] = useState('stats');

  return (
    // All filtering instruments and total result display are up next:
    <div className="container mx-auto p-4 md:p-0">
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
          filterDateRange={filterDateRange}
          filterOverview={filterOverview}
          setFilterOverview={setFilterOverview}
          totalBeerCount={filteredData.length}
          setFilterDateRange={setFilterDateRange}
        />
      </div>
      {filteredData && filteredData.length > 0 ? (
        <div>
          {/* section Buttons */}
          <DashboardNav
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
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
        // in case of no results:
        <NotificationBar
          text="Your filters didn't return a result. Adjust your filters or sse the 'Reset filters'
          button above."
        />
      )}
    </div>
  );
};

export default Dashboard;
