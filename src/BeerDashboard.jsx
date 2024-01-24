/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import LeafletMap from './LeafletMap.jsx';
import TaggedFriendsList from './TaggedFriendsList.jsx';
import BeerList from './BeerList.jsx';
import PieChart from './PieChart.jsx';

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
      console.error('kut..');
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
    <div className="container mx-auto mt-8 p-8 bg-gray-100 rounded shadow-md">
      <h1 className="mb-5 text-4xl font-bold">Untappd 10 Years App</h1>
      {filteredData?.length && (
        <h2 className="mb-3 text-2xl font-bold">{filteredData?.length} resultaten</h2>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Created Between:
        </label>
        <div className="flex">
          <input
            type="date"
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={filterDateRange.start}
            onChange={(e) =>
              setFilterDateRange({ ...filterDateRange, start: e.target.value })
            }
          />
          <input
            type="date"
            className="ml-2 shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={filterDateRange.end}
            onChange={(e) =>
              setFilterDateRange({ ...filterDateRange, end: e.target.value })
            }
          />
        </div>
      </div>
      {filteredData?.length > 0 && (
        <>
          <div className="overflow-hidden m-0 mx-96 bg-white p-4 rounded shadow-md my-4">
            <PieChart beerData={filteredData} />
          </div>
          <div className="overflow-hidden rounded shadow-md my-4">
            <LeafletMap beerData={filteredData} />
          </div>
          <div className="overflow-hidden bg-slate-200 rounded shadow-md my-4 p-4">
            <TaggedFriendsList beerData={filteredData} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Brewery:</label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={filterBrewery}
              onChange={(e) => setFilterBrewery(e.target.value)}
            />
          </div>
          <div>
            <BeerList beerData={filteredData} />
          </div>
        </>
      )}
    </div>
  );
};

export default BeerDashboard;
