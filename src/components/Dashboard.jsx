import { useState, useEffect } from 'react';
import Map from './Map.jsx';
import TopList from './TopList/TopList.jsx';
import Overview from './Overview.jsx';
import OverviewFilters from './OverviewFilters.jsx';
import PieChartList from './Charts/PieChartList.jsx';
import BarChartList from './Charts/BarChartList.jsx';
import DateSelector from './DateSelector/DateSelector.jsx';
import YearFilterButtons from './YearFilterButtons.jsx';
import ResetFilters from './ResetFilters.jsx';
import {
  filterBeerData,
  getDefaultStartDate,
  getDefaultEndDate,
  fetchData,
} from '../utils/';

const Dashboard = () => {
  const [beerData, setBeerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOverview, setFilterOverview] = useState({
    brewery_name: '',
    venue_country: '',
    brewery_city: '',
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
    // console.log('debug:', filteredResults);
    setFilteredData(filteredResults);
  }, [beerData, filterOverview, filterDateRange]);

  return (
    <>
      <DateSelector
        beerData={beerData}
        filterDateRange={filterDateRange}
        setFilterDateRange={setFilterDateRange}
      />
      {filteredData && filteredData?.length > 0 ? (
        <>
          <div className="rounded shadow-md">
            <OverviewFilters
              beerData={filteredData}
              filterOverview={filterOverview}
              setFilterOverview={setFilterOverview}
            />
            <YearFilterButtons
              beerData={beerData}
              filterDateRange={filterDateRange}
              setFilterDateRange={setFilterDateRange}
            />
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold">{filteredData?.length} results</h2>
              {filterOverview && <ResetFilters setFilterOverview={setFilterOverview} />}
            </div>
            <div className="container mx-auto mt-4 p-8 bg-gray-800 rounded shadow-md">
              <div className="grid lg:grid-cols-2 gap-8 text-white">
                <PieChartList beerData={filteredData} />
                <BarChartList beerData={filteredData} />
                <TopList
                  dataType="topBeers"
                  scoreType="rating_score"
                  beerData={filteredData}
                  listTitle="Top 10 Rated Beers (by you)"
                />
                <TopList
                  dataType="topBeers"
                  scoreType="global_weighted_rating_score"
                  beerData={filteredData}
                  listTitle="Top 10 Rated Beers (global, weighted)"
                  selfCompare
                />
                <TopList
                  dataType="topBeers"
                  scoreType="beer_abv"
                  beerData={filteredData}
                  listTitle="Top 10 Strongest Beers"
                />
                <TopList
                  scoreType="total_toasts"
                  dataType="topBeers"
                  beerData={filteredData}
                  listTitle="Top 10 Toasts"
                />
                <TopList
                  scoreType="total_comments"
                  dataType="topBeers"
                  beerData={filteredData}
                  listTitle="Top 10 Comments"
                />
                <TopList
                  dataType="flavorProfiles"
                  beerData={filteredData}
                  lowerCase
                  listTitle="Top Flavour Profiles"
                />
                <TopList
                  dataType="flavorProfileCombis"
                  beerData={filteredData}
                  lowerCase
                  listTitle="Top Flavour Profile combinations"
                />
                <Map beerData={filteredData} />
                <TopList
                  dataType="friends"
                  beerData={filteredData}
                  listTitle="Tagged Friends"
                />
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
