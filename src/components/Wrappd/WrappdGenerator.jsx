import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useDashboardData } from '../../utils/';
import WrappdBacklog from './WrappdBacklog';
import WrappdShareBox from './WrappdShareBox';

const WrappdGenerator = () => {
  const [backlogRefreshKey, setBacklogRefreshKey] = useState(0);

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/my-wrappd',
      title: 'Wrappd Generator',
    });
  }, []);

  const {
    beerData,
    filteredData,
    filterOverview,
    filterDateRange,
    setFilterDateRange,
    setIsFilterSidebarOpen,
  } = useDashboardData();

  return (
    <>
      <div className="mx-auto mb-8 max-w-3xl overflow-hidden bg-gray-800 text-white shadow-2xl md:rounded-2xl">
        <video
          className="mx-auto w-full max-w-3xl object-cover"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        >
          <source src="/media/output.mp4" type="video/mp4" />
        </video>
        <WrappdShareBox
          filteredData={filteredData}
          beerData={beerData}
          filterDateRange={filterDateRange}
          setFilterDateRange={setFilterDateRange}
          filterOverview={filterOverview}
          onFilterClick={() => setIsFilterSidebarOpen(true)}
          lookupRefreshKey={backlogRefreshKey}
          onShareCreated={() => setBacklogRefreshKey((key) => key + 1)}
        />
      </div>
      <div className="mx-auto max-w-3xl bg-gray-800 p-6 text-white shadow-2xl md:rounded-2xl md:p-10">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-3xl font-bold text-yellow-500">Previous Wrappds</h2>
        </div>
        <WrappdBacklog
          refreshKey={backlogRefreshKey}
          onWrappdDeleted={() => setBacklogRefreshKey((key) => key + 1)}
        />
      </div>
    </>
  );
};

export default WrappdGenerator;
