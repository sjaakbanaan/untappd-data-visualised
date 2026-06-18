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

  const { filteredData, filterOverview, filterDateRange } = useDashboardData();

  return (
    <div className="mx-auto max-w-3xl bg-gray-800 p-6 text-white shadow-2xl md:rounded-2xl md:p-10">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-3xl font-bold text-yellow-500">My Tappd Wrappd</h2>
        <p className="text-gray-400">
          Generate a summary of your beer journey to share with friends.
        </p>
      </div>

      <div className="rounded-xl bg-gray-700/50 p-1">
        <WrappdShareBox
          filteredData={filteredData}
          filterDateRange={filterDateRange}
          filterOverview={filterOverview}
          lookupRefreshKey={backlogRefreshKey}
          onShareCreated={() => setBacklogRefreshKey((key) => key + 1)}
        />
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        <p>
          Tip: Use the dashboard filters to select specific years or categories before
          generating your Wrappd.
        </p>
      </div>

      <WrappdBacklog
        refreshKey={backlogRefreshKey}
        onWrappdDeleted={() => setBacklogRefreshKey((key) => key + 1)}
      />
    </div>
  );
};

export default WrappdGenerator;
