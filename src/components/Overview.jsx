import { formatDate } from '../utils';

const Overview = ({ beerData }) => {
  return (
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
  );
};

export default Overview;
