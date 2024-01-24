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
          <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {beerData?.length > 0 &&
              beerData.map((item) => (
                <li
                  key={item.checkin_id}
                  className="rounded-lg p-4 shadow-md bg-cover bg-gray-800 min-h-96"
                  style={{
                    backgroundImage: `url(${item.photo_url})`,
                  }}
                >
                  <a
                    href={item.checkin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h2 className="text-xl text-white font-semibold mb-2">
                      {item.beer_name}
                    </h2>
                    {/* <img src={item.photo_url} alt="" /> */}
                    <p className="text-white mb-2">{item.brewery_name}</p>
                    <p className="text-white">
                      Created at: {formatDate(item.created_at)}
                    </p>
                    <p className="text-green-600">Rating: {item.rating_score}</p>
                    <p className="text-white">@{item.venue_name}</p>
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BeerList;
