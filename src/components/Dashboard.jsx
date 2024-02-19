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
  filterDuplicateBeers,
} from '../utils/';

const Dashboard = () => {
  const [beerData, setBeerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOverview, setFilterOverview] = useState({
    brewery_name: '',
    venue_country: '',
    venue_city: '',
  });
  const [filterDateRange, setFilterDateRange] = useState({
    start: getDefaultStartDate(),
    end: getDefaultEndDate(),
  });

  const isFilterOverviewSet = (filterOverview) => {
    for (const key in filterOverview) {
      if (Object.hasOwnProperty.call(filterOverview, key) && filterOverview[key] !== '') {
        return true;
      }
    }
    return false;
  };

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
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold">
                {totalBeerCount} beers <span className="text-gray-600">/</span>{' '}
                {totalUniqueBeerCount} uniques{' '}
                <span className="text-gray-600">(+{totalDiff})</span>
              </h2>
              {isFilterOverviewSet(filterOverview) && (
                <ResetFilters setFilterOverview={setFilterOverview} />
              )}
            </div>
            <div className="container mx-auto mt-4 p-8 bg-gray-800 rounded shadow-md">
              <div className="grid lg:grid-cols-2 gap-8 text-white">
                <PieChartList beerData={filteredData} />
                <BarChartList beerData={filteredData} />
                <TopList
                  dataType="topBeers"
                  scoreType="rating_score"
                  beerData={filteredData}
                  listTitle="Top 10 rated beers (by you)"
                />
                <TopList
                  dataType="topBeers"
                  scoreType="global_weighted_rating_score"
                  beerData={filteredData}
                  listTitle="Top 10 rated beers (global / you (diff))"
                  selfCompare
                />
                <TopList
                  dataType="topBeers"
                  scoreType="beer_abv"
                  beerData={filteredData}
                  listTitle="Top 10 strongest beers"
                />
                <TopList
                  scoreType="total_toasts"
                  dataType="topBeers"
                  beerData={filteredData}
                  listTitle="Top 10 toasts"
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
                  listTitle="Top flavour profiles"
                />
                <TopList
                  dataType="flavorProfileCombis"
                  beerData={filteredData}
                  lowerCase
                  listTitle="Top flavour profile combinations"
                />
                <TopList
                  dataType="friends"
                  beerData={filteredData}
                  listTitle="Tagged friends"
                />
                <TopList
                  dataType="topByRating"
                  scoreType="brewery_name"
                  beerData={filteredData}
                  listTitle="Breweries by rating"
                />
                <TopList
                  dataType="topByRating"
                  scoreType="beer_type"
                  beerData={filteredData}
                  listTitle="Beer types by rating"
                />
                <Map beerData={filteredData} />
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
