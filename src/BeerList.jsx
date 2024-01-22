import { formatDate } from './utils';

const BeerList = ({ beerData }) => {
  return (
    <div>
      <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {beerData?.length > 0 &&
          beerData.map((item) => (
            <li key={item.checkin_id} className="bg-white rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-semibold mb-2">{item.beer_name}</h2>
              <img src={item.photo_url} alt="" />
              <p className="text-gray-700 mb-2">{item.brewery_name}</p>
              <p className="text-gray-600">Created at: {formatDate(item.created_at)}</p>
              <p className="text-green-600">Rating: {item.rating_score}</p>
              <p className="text-gray-600">Venue: {item.venue_name}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BeerList;
