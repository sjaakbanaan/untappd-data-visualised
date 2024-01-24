/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import { formatDate } from './utils';

const BeerList = ({ beerData, filterBrewery, setFilterBrewery }) => {
  return (
    <>
      <div className="mb-5 mt-8">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Filter by brewery:
        </label>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={filterBrewery}
          onChange={(e) => setFilterBrewery(e.target.value)}
        />
      </div>
      <div>
        <div>
          <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4  xl:grid-cols-6">
            {beerData?.length > 0 &&
              beerData.map((item) => (
                <li
                  key={item.checkin_id}
                  className="bg-white rounded-lg p-4 shadow-md bg-cover"
                  style={{
                    backgroundColor: 'rgba(40, 40, 40, 1)',
                    backgroundImage: `url(${item.photo_url})`,
                  }}
                >
                  <h2 className="text-xl text-white font-semibold mb-2">
                    {item.beer_name}
                  </h2>
                  {/* <img src={item.photo_url} alt="" /> */}
                  <p className="text-white mb-2">{item.brewery_name}</p>
                  <p className="text-white">Created at: {formatDate(item.created_at)}</p>
                  <p className="text-green-600">Rating: {item.rating_score}</p>
                  <p className="text-white">@{item.venue_name}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BeerList;
