import { useState, useEffect, lazy, Suspense } from 'react';
import ReactGA from 'react-ga4';

import { useDashboardData } from '../../utils/';
import { useAuth } from '../../context/AuthContext';

import DashboardHeader from './DashboardHeader';
import FilterSidebar from './FilterSidebar';
import NotificationBar from '../UI/NotificationBar';
import DashboardNav from './DashboardNav';
import AIAnalysis from '../AIAnalysis/AIAnalysis';
import ScraperXLDisclaimer from '../ScraperXLDisclaimer';
import Icon from '../UI/Icon/Icon';

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
const Badges = lazy(() => import('../Badges/Badges'));

const Dashboard = () => {
  // analytics
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/dashboard',
      title: 'Dashboard',
    });
  });
  const { userProfile } = useAuth();
  const geminiApiKey = userProfile?.gemini_api_key;
  const mapboxKey = userProfile?.mapbox_key;

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

  // Add state for AI analysis to persist across tab switches
  const [aiAnalysis, setAiAnalysis] = useState('');

  // Sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    // All filtering instruments and total result display are up next:
    <div className="container mx-auto p-4 md:p-0">
      <ScraperXLDisclaimer />
      <div>
        <DashboardHeader
          filterDateRange={filterDateRange}
          filterOverview={filterOverview}
          setFilterOverview={setFilterOverview}
          totalBeerCount={filteredData.length}
          setFilterDateRange={setFilterDateRange}
          onFilterClick={() => setIsSidebarOpen(true)}
        />
        {/* Floating Action Button for Filters */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center gap-2 rounded-full bg-yellow-500 p-4 font-bold text-black shadow-2xl transition-all hover:scale-105 hover:bg-yellow-400 md:px-6 md:py-3 lg:bottom-10 lg:right-10"
          aria-label="Refine Filters"
        >
          <Icon icon="FILTER" className="w-5" />
          <span className="hidden md:inline">Refine Filters</span>
        </button>
      </div>

      <FilterSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        beerData={beerData}
        filteredData={filteredData}
        filterDateRange={filterDateRange}
        setFilterDateRange={setFilterDateRange}
        filterOverview={filterOverview}
        setFilterOverview={setFilterOverview}
      />

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
                    filteredData={filteredData}
                    beerData={beerData}
                    filterDateRange={filterDateRange}
                    filterOverview={filterOverview}
                    fullBeerData={beerData}
                  />
                  <TopTableList beerData={filteredData} />
                </>
              )}
              {activeSection === 'charts' && (
                <>
                  <PieChartList beerData={filteredData} />
                  <BarChartList
                    beerData={filteredData}
                    filterDateRange={filterDateRange}
                  />
                  <LineChart beerData={filteredData} />
                  <BeerTypeChart beerData={filteredData} />
                </>
              )}
              {activeSection === 'maps' && mapboxKey && (
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
              {activeSection === 'ai' && geminiApiKey && (
                <div className="lg:col-span-2">
                  <AIAnalysis
                    beerData={filteredData}
                    analysis={aiAnalysis}
                    setAnalysis={setAiAnalysis}
                    filterDateRange={filterDateRange}
                    geminiApiKey={geminiApiKey}
                  />
                </div>
              )}
              {activeSection === 'badges' && <Badges />}
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
