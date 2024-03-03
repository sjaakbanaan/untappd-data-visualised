import { useState, useEffect } from 'react';
import Map from './Map.jsx';
import TopTableList from './TopTableList/TopTableList.jsx';
import Overview from './Overview/Overview.jsx';
import OverviewFilters from './Overview/OverviewFilters.jsx';
import PieChartList from './Charts/PieChartList.jsx';
import BarChartList from './Charts/BarChartList.jsx';
import LineChart from './Charts/LineChart.jsx';
import DateSelector from './DateSelector/DateSelector.jsx';
import YearFilterButtons from './YearFilterButtons.jsx';
import ResetFilters from './ResetFilters.jsx';
import {
  filterBeerData,
  getDefaultStartDate,
  getDefaultEndDate,
  fetchData,
  filterDuplicateBeers,
  isFilterOverviewSet,
} from '../utils/';

const Dashboard = () => {
  const [beerData, setBeerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOverview, setFilterOverview] = useState({
    brewery_name: '',
    venue_country: '',
    venue_city: '',
    beer_type: '',
  });
  const [filterDateRange, setFilterDateRange] = useState({
    start: getDefaultStartDate(),
    end: getDefaultEndDate(),
  });

  useEffect(() => {
    // Fetch the JSON file or import it directly
    const fetchDataAndSetState = async () => {
      const data = await fetchData('/beers-processed.json');
      if (data) {
        setBeerData(data);
        setFilteredData(); // Initial load without filters
      }
    };

    fetchDataAndSetState();
  }, []);

  useEffect(() => {
    // this is ran each time a filter changes
    const filteredResults = filterBeerData(beerData, filterOverview, filterDateRange);
    // console.log('debug:', filterOverview);
    setFilteredData(filteredResults);
  }, [beerData, filterOverview, filterDateRange]);

  const totalBeerCount = filteredData && filteredData?.length;
  const totalUniqueBeerCount = filteredData && filterDuplicateBeers(filteredData)?.length;
  const totalDiff = totalBeerCount - totalUniqueBeerCount;

  const totalDays =
    filterDateRange &&
    (new Date(filterDateRange.end) - new Date(filterDateRange.start)) /
      (1000 * 60 * 60 * 24);
  return (
    <>
      <DateSelector
        beerData={beerData}
        filterDateRange={filterDateRange}
        setFilterDateRange={setFilterDateRange}
      />
      {filteredData && totalBeerCount > 0 ? (
        <>
          <div className="rounded shadow-md">
            <YearFilterButtons
              beerData={beerData}
              filterDateRange={filterDateRange}
              setFilterDateRange={setFilterDateRange}
            />
            <OverviewFilters
              beerData={filteredData}
              filterOverview={filterOverview}
              setFilterOverview={setFilterOverview}
            />
            <div className="flex items-center mt-10 mb-6">
              <h2 className="text-2xl font-bold">
                {totalBeerCount} beers <span className="text-gray-600">/</span>{' '}
                {totalUniqueBeerCount} uniques{' '}
                <span className="text-gray-600">(+{totalDiff})</span>
              </h2>
              <div className="ml-2 text-yellow-500">
                {(totalBeerCount / totalDays).toFixed(2)} per day
              </div>
              {isFilterOverviewSet(filterOverview) && (
                <ResetFilters setFilterOverview={setFilterOverview} />
              )}
            </div>
            <div className="container mx-auto mt-4 p-8 bg-gray-800 rounded shadow-md">
              <div className="grid lg:grid-cols-2 gap-8 text-white">
                <PieChartList beerData={filteredData} />
                <BarChartList beerData={filteredData} />
                <TopTableList beerData={filteredData} />
                <Map beerData={filteredData} />
                <LineChart beerData={filteredData} />
              </div>
            </div>
          </div>
          <Overview beerData={filteredData} />
        </>
      ) : (
        <div className="mt-4">
          Loading results or your filters didn't return a result.
        </div>
      )}
    </>
  );
};

export default Dashboard;
