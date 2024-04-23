import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import VenueMap from '../Maps/VenueMap.jsx';
import BreweryMap from '../Maps/BreweryMap.jsx';
import TopTableList from '../TopTableList/TopTableList.jsx';
import Overview from '../Overview/Overview.jsx';
import OverviewFilters from '../Overview/OverviewFilters.jsx';
import PieChartList from '../Charts/PieChartList.jsx';
import BarChartList from '../Charts/BarChartList.jsx';
import LineChart from '../Charts/LineChart.jsx';
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
    venue_country: '',
    venue_city: '',
    venue_name: '',
    brewery_country: '',
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
      {filteredData && filteredData.length > 0 ? (
        <>
          <div className="rounded shadow-md">
            <div class="container mx-auto p-4 md:p-0">
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
            </div>
            <div className="container mx-auto mt-4 p-2 md:p-8 bg-gray-800 md:rounded shadow-md">
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
          Loading results or your filters didn't return a result. Did you already{' '}
          <Link className="text-yellow-500 underline" to="/upload">
            upload your Untappd JSON export
          </Link>
          ?
        </div>
      )}
    </>
  );
};

export default Dashboard;
