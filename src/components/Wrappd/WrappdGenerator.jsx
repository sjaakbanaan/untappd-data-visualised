import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useDashboardData } from '../../utils/';
import WrappdShareBox from './WrappdShareBox';

const WrappdGenerator = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/my-wrappd',
      title: 'Wrappd Generator',
    });
  }, []);

  const {
    filteredData,
    filterOverview,
    filterDateRange,
  } = useDashboardData();

  return (
    <div className="mx-auto max-w-3xl bg-gray-800 p-6 text-white shadow-2xl md:rounded-2xl md:p-10">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-3xl font-bold text-yellow-500">Your Tappd Wrappd</h2>
        <p className="text-gray-400">
          Generate a summary of your beer journey to share with friends.
        </p>
      </div>

      <div className="rounded-xl bg-gray-700/50 p-1">
        <WrappdShareBox
          filteredData={filteredData}
          filterDateRange={filterDateRange}
          filterOverview={filterOverview}
        />
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>
          Tip: Use the dashboard filters to select specific years or categories before generating your Wrappd.
        </p>
      </div>
    </div>
  );
};

export default WrappdGenerator;
