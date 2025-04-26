import { useState, useEffect, lazy, Suspense } from 'react';
import ReactGA from 'react-ga4';

import { useDashboardData } from '../../utils/';
import DashboardHeader from './DashboardHeader';
import YearFilterButtons from './YearFilterButtons';
import DateSelector from './DateSelector';
import OverviewFilters from '../Overview/OverviewFilters';
import NotificationBar from '../UI/NotificationBar';
import DashboardNav from './DashboardNav';

// Lazy-load heavy components
const BasicStats = lazy(() => import('../BasicStats/BasicStats'));
const PieChartList = lazy(() => import('../Charts/PieChartList'));
const BarChartList = lazy(() => import('../Charts/BarChartList'));
const TopTableList = lazy(() => import('../TopTableList/TopTableList'));
const LineChart = lazy(() => import('../Charts/LineChart'));
const VenueMap = lazy(() => import('../Maps/VenueMap'));
const BreweryMap = lazy(() => import('../Maps/BreweryMap'));
const BeerTypeChart = lazy(() => import('../Charts/BeerTypeChart/BeerTypeChart'));
const Overview = lazy(() => import('../Overview/Overview'));

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
                    filterOverview={filterOverview}
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
          text="Your filters didn't return a result. Adjust your filters or use the 'Reset filters'
          button above."
        />
      )}
    </div>
  );
};

export default Dashboard;
