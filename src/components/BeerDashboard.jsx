import { useState, useEffect } from 'react';
import LeafletMap from './LeafletMap.jsx';
import TopList from './TopList/TopList.jsx';
import BeerList from './BeerList.jsx';
import PieChartList from './PieChartList.jsx';
import DateSelector from './DateSelector/DateSelector.jsx';
import YearFilterButtons from './YearFilterButtons.jsx';
import { getDefaultStartDate, getDefaultEndDate, fetchData } from '../utils';

const BeerDashboard = () => {
  const [beerData, setBeerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterBrewery, setFilterBrewery] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
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
    // Apply filters whenever filterBrewery or filterDateRange changes
    const filteredResults = beerData.filter((item) => {
      const breweryMatch = filterBrewery
        ? item?.brewery_name?.toLowerCase().includes(filterBrewery.toLowerCase())
        : true;

      const countryMatch = filterCountry
        ? item?.venue_country?.toLowerCase().includes(filterCountry.toLowerCase())
        : true;

      const dateMatch =
        filterDateRange.start &&
        filterDateRange.end &&
        new Date(item.created_at) >= new Date(filterDateRange.start) &&
        new Date(item.created_at) <= new Date(filterDateRange.end);

      return breweryMatch && countryMatch && dateMatch;
    });

    setFilteredData(filteredResults);
  }, [beerData, filterBrewery, filterCountry, filterDateRange]);

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white rounded shadow-md">
      {filteredData?.length && (
        <>
          <h1 className="text-center mb-5 text-4xl font-bold">Untappd Data Visualised</h1>
          <DateSelector
            beerData={beerData}
            filterDateRange={filterDateRange}
            setFilterDateRange={setFilterDateRange}
          />
          <YearFilterButtons
            beerData={beerData}
            filterDateRange={filterDateRange}
            setFilterDateRange={setFilterDateRange}
          />
          <h2 className="text-xl font-bold">{filteredData?.length} results</h2>
          <div className="container mx-auto mt-4 p-8 bg-gray-800 rounded shadow-md">
            <div className="grid lg:grid-cols-2 gap-8 text-white">
              <PieChartList beerData={filteredData} />
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
              />
              <TopList
                dataType="topBeers"
                scoreType="beer_abv"
                beerData={filteredData}
                listTitle="Top 10 Strongest Beers"
              />
              <LeafletMap beerData={filteredData} />
              <TopList
                dataType="friends"
                beerData={filteredData}
                listTitle="Tagged Friends"
              />
            </div>
          </div>
          <BeerList
            beerData={filteredData}
            filterBrewery={filterBrewery}
            setFilterBrewery={setFilterBrewery}
            filterCountry={filterCountry}
            setFilterCountry={setFilterCountry}
          />
        </>
      )}
    </div>
  );
};

export default BeerDashboard;
