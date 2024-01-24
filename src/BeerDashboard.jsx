/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import LeafletMap from './LeafletMap.jsx';
import TaggedFriendsList from './TaggedFriendsList.jsx';
import BeerList from './BeerList.jsx';
import PieChart from './PieChart.jsx';
import DateSelector from './DateSelector.jsx';

const BeerDashboard = () => {
  const getDefaultStartDate = () => {
    const currentDate = new Date();
    const last30Days = new Date(currentDate);
    last30Days.setDate(currentDate.getDate() - 30);
    return last30Days.toISOString().split('T')[0];
  };

  const getDefaultEndDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const legendOptions = {
    display: true,
    position: 'bottom',
  };

  const [beerData, setBeerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterBrewery, setFilterBrewery] = useState('');
  const [filterDateRange, setFilterDateRange] = useState({
    start: getDefaultStartDate(),
    end: getDefaultEndDate(),
  });

  useEffect(() => {
    // Fetch the JSON file or import it directly
    const fetchData = async () => {
      try {
        const response = await fetch('/beers.json');
        const data = await response.json();
        setBeerData(data);
        setFilteredData(); // Initial load without filters
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Apply filters whenever filterBrewery or filterDateRange changes
    const filteredResults = beerData.filter((item) => {
      const breweryMatch = filterBrewery
        ? item.brewery_name.toLowerCase().includes(filterBrewery.toLowerCase())
        : true;

      const dateMatch =
        filterDateRange.start &&
        filterDateRange.end &&
        new Date(item.created_at) >= new Date(filterDateRange.start) &&
        new Date(item.created_at) <= new Date(filterDateRange.end);

      return breweryMatch && dateMatch;
    });

    setFilteredData(filteredResults);
  }, [beerData, filterBrewery, filterDateRange]);

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white rounded shadow-md">
      {filteredData?.length && (
        <>
          <h1 className="text-center mb-5 text-4xl font-bold">My Untappd data</h1>
          <DateSelector
            beerData={filteredData}
            filterDateRange={filterDateRange}
            setFilterDateRange={setFilterDateRange}
          />
          <h2 className="text-xl font-bold">{filteredData?.length} results</h2>
          <div className="container mx-auto mt-4 p-8 bg-gray-800 rounded shadow-md">
            <div className="grid lg:grid-cols-2 gap-8 text-white">
              <div>
                <h2 className="text-lg font-semibold mb-2">Top 10 Breweries</h2>
                <PieChart
                  dataType="brewery_name"
                  options={{ legend: legendOptions }}
                  beerData={filteredData}
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Top 10 Beer Styles</h2>
                <PieChart
                  dataType="beer_type"
                  options={{ legend: legendOptions }}
                  beerData={filteredData}
                />
              </div>
              <div>
                <div className="overflow-hidden border border-gray-900 rounded shadow-md my-4">
                  <LeafletMap beerData={filteredData} />
                </div>
              </div>
              <div>
                <TaggedFriendsList beerData={filteredData} />
              </div>
            </div>
          </div>
          <BeerList
            beerData={filteredData}
            filterBrewery={filterBrewery}
            setFilterBrewery={setFilterBrewery}
          />
        </>
      )}
    </div>
  );
};

export default BeerDashboard;
