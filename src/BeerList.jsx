import { formatDate } from './utils';

const BeerList = ({ beerData }) => {
  return (
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
              <h2 className="text-xl text-white font-semibold mb-2">{item.beer_name}</h2>
              {/* <img src={item.photo_url} alt="" /> */}
              <p className="text-white mb-2">{item.brewery_name}</p>
              <p className="text-white">Created at: {formatDate(item.created_at)}</p>
              <p className="text-green-600">Rating: {item.rating_score}</p>
              <p className="text-white">@{item.venue_name}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default BeerList;
