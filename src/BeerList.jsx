import React, { useState, useEffect } from 'react';

const BeerList = () => {

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
      try {
        const response = await fetch('/beers.json');
        const data = await response.json();
        setBeerData(data);
        setFilteredData(data); // Initial load without filters
      } catch (error) {
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
        (filterDateRange.start && filterDateRange.end) &&
        (new Date(item.created_at) >= new Date(filterDateRange.start) &&
          new Date(item.created_at) <= new Date(filterDateRange.end));

      return breweryMatch && dateMatch;
    });

    setFilteredData(filteredResults);
  }, [beerData, filterBrewery, filterDateRange]);

  return (
    <div>
      <div>
        <label>Brewery Name:</label>
        <input
          type="text"
          value={filterBrewery}
          onChange={(e) => setFilterBrewery(e.target.value)}
        />
      </div>
      <div>
        <label>Created Between:</label>
        <input
          type="date"
          value={filterDateRange.start}
          onChange={(e) =>
            setFilterDateRange({ ...filterDateRange, start: e.target.value })
          }
        />
        <input
          type="date"
          value={filterDateRange.end}
          onChange={(e) =>
            setFilterDateRange({ ...filterDateRange, end: e.target.value })
          }
        />
      </div>
      <ul>
        {filteredData.map((item) => (
          <li key={item.checkin_id}>
            <strong>{item.beer_name}</strong> - {item.brewery_name}, Rating: {item.rating_score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BeerList;