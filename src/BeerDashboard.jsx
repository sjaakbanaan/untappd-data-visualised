/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import LeafletMap from './LeafletMap.jsx';
import TaggedFriendsList from './TaggedFriendsList.jsx';
import BeerList from './BeerList.jsx';
import PieChart from './PieChart.jsx';
import DateSelector from './DateSelector.jsx';
import YearFilterButtons from './YearFilterButtons.jsx';
import { getDefaultStartDate, getDefaultEndDate, fetchData } from './utils';

const BeerDashboard = () => {
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
    const fetchDataAndSetState = async () => {
      const data = await fetchData('/beers.json');
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

  const pieChartList = [
    {
      title: 'Top 10 Breweries',
      name: 'brewery_name',
    },
    {
      title: 'Top 10 Beer Styles',
      name: 'beer_type',
    },
    {
      title: 'Top 10 Venues Purchased',
      name: 'purchase_venue',
    },
  ];

  return (
    <div className="container mx-auto p-8 bg-gray-900 text-white rounded shadow-md">
      {filteredData?.length && (
        <>
          <h1 className="text-center mb-5 text-4xl font-bold">Untappd Data Visualised</h1>
          <DateSelector
            beerData={filteredData}
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
              {pieChartList &&
                pieChartList.map((item) => (
                  <div>
                    <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                    <PieChart
                      dataType={item.name}
                      options={{ legend: legendOptions }}
                      beerData={filteredData}
                    />
                  </div>
                ))}
              <LeafletMap beerData={filteredData} />
              <TaggedFriendsList beerData={filteredData} />
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
