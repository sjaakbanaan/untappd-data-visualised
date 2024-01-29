/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { useState, useEffect } from 'react';
import { formatDate } from '../utils';

const BeerList = ({
  beerData,
  filterBrewery,
  setFilterBrewery,
  filterCountry,
  setFilterCountry,
}) => {
  const [breweryOptions, setBreweryOptions] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    // Extract unique brewery names and countries from filteredData
    const uniqueBreweries = [...new Set(beerData.map((item) => item.brewery_name))];
    const uniqueCountries = [...new Set(beerData.map((item) => item.venue_country))];

    // Update state with unique brewery and country options, filtering out empty values
    setBreweryOptions(uniqueBreweries.filter(Boolean));
    setCountryOptions(uniqueCountries.filter(Boolean));
  }, [beerData]);

  return (
    <>
      <div className="flex mb-5 mt-8">
        <div className="w-1/2 py-2 px-3">
          <label className="block text-white text-sm font-bold mb-2">
            Filter by brewery:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            value={filterBrewery}
            onChange={(e) => setFilterBrewery(e.target.value)}
          >
            <option value="">All Breweries</option>
            {breweryOptions.map((brewery) => (
              <option key={brewery} value={brewery}>
                {brewery}
              </option>
            ))}
          </select>
        </div>
        <div className=" py-2 px-3 w-1/2">
          <label className="block text-white text-sm font-bold mb-2">
            Filter by country:
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
          >
            <option value="">All Countries</option>
            {countryOptions.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <div>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {beerData?.length > 0 &&
              beerData.map((item) => (
                <a
                  key={item.checkin_id}
                  href={item.checkin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg shadow-md bg-cover p-4 bg-gray-800 min-h-96 transition-transform transform hover:scale-105"
                  style={{
                    backgroundImage: `url(${item.photo_url})`,
                  }}
                >
                  <h2 className="text-xl text-white font-semibold mb-2">
                    {item.beer_name}
                  </h2>
                  <p className="text-white mb-2">{item.brewery_name}</p>
                  <p className="text-white mb-2">{item.beer_type}</p>
                  <p className="text-white">Created at: {formatDate(item.created_at)}</p>
                  <p className="text-green-600">Rating: {item.rating_score}</p>
                  {item.venue_name && <p className="text-white">@{item.venue_name}</p>}
                </a>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BeerList;
