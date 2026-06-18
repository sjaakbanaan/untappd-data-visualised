import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import AppRoutes from './AppRoutes';
import PageTransition from './UI/PageTransition';
import FilterSidebar from './Dashboard/FilterSidebar';
import Icon from './UI/Icon/Icon';
import { useDashboardData } from '../utils';

const DEFAULT_TITLE = 'Tappd (Untappd Data Visualised)';

const pageTitles = {
  '/login': 'Login - Tappd',
  '/upload': 'Upload - Tappd',
  '/settings': 'Settings - Tappd',
  '/leaderboard': 'Leaderboard - Tappd',
  '/my-wrappd': 'My Wrappd - Tappd',
};

const AppContent = () => {
  const location = useLocation();
  const isWrappdRoute = location.pathname.startsWith('/wrappd');
  const isDashboard = location.pathname === '/';
  const isGenerator = location.pathname === '/my-wrappd';

  // Routes where the filter button and sidebar should be visible
  const showFilters = isDashboard || isGenerator;

  const {
    beerData,
    filteredData,
    filterOverview,
    setFilterOverview,
    filterDateRange,
    setFilterDateRange,
    isFilterSidebarOpen,
    setIsFilterSidebarOpen,
    dataLoading,
  } = useDashboardData();

  const [fabVisible, setFabVisible] = useState(false);

  useEffect(() => {
    if (!isWrappdRoute) {
      document.title = pageTitles[location.pathname] || DEFAULT_TITLE;
    }
  }, [isWrappdRoute, location.pathname]);

  // Trigger Filter Button fade-in when data is ready
  useEffect(() => {
    if (!dataLoading && beerData.length > 0 && showFilters) {
      setFabVisible(true);
    } else if (!showFilters) {
      setFabVisible(false);
    }
  }, [dataLoading, beerData.length, showFilters]);

  return (
    <>
      {!isWrappdRoute && <Header />}
      <div className={`${isWrappdRoute ? 'bg-wrappd-gradient' : 'px-1 md:px-6'}`}>
        <PageTransition>
          <AppRoutes />
        </PageTransition>
        {!isWrappdRoute && <Footer />}
      </div>

      {showFilters && (
        <>
          <FilterSidebar
            isOpen={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
            beerData={beerData}
            filteredData={filteredData}
            filterDateRange={filterDateRange}
            setFilterDateRange={setFilterDateRange}
            filterOverview={filterOverview}
            setFilterOverview={setFilterOverview}
          />

          {!dataLoading &&
            beerData.length > 0 &&
            createPortal(
              <button
                onClick={() => setIsFilterSidebarOpen(true)}
                className={`fixed bottom-6 right-6 z-40 flex items-center justify-center gap-2 rounded-full bg-yellow-500 p-4 font-bold text-black shadow-2xl transition-all duration-500 ease-out hover:scale-105 hover:bg-yellow-400 md:px-6 md:py-3 lg:bottom-10 lg:right-10 ${
                  fabVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                aria-label="Refine Filters"
              >
                <Icon icon="FILTER" className="w-5" />
                <span className="hidden md:inline">Refine Filters</span>
              </button>,
              document.body
            )}
        </>
      )}
    </>
  );
};

export default AppContent;
