import { formatDate } from '../utils';
import Icon from './Icon/Icon.jsx';

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
                className="block rounded-lg shadow-md bg-cover p-4 bg-gray-800 min-h-96 transition-transform duration-300 transform hover:scale-110"
                style={{
                  backgroundImage: `url(${item.photo_url})`,
                }}
              >
                <h2 className="text-xl text-white font-semibold mb-2">
                  {item.beer_name}
                </h2>
                <p className="mb-2">{item.brewery_name}</p>
                <div className="flex items-top mb-2">
                  <Icon
                    icon="INFO"
                    viewBox="0 0 16 16"
                    className="mr-2 mt-1 fill-yellow-500"
                  />
                  <div className="flex-1">{item.beer_type}</div>
                </div>
                <div className="flex items-top mb-2">
                  <Icon
                    icon="INFO"
                    viewBox="0 0 16 16"
                    className="mr-2 mt-1 fill-yellow-500"
                  />
                  <div className="flex-1">{formatDate(item.created_at)}</div>
                </div>
                {item.venue_name && (
                  <div className="flex items-top mb-2">
                    <Icon
                      icon="INFO"
                      viewBox="0 0 16 16"
                      className="mr-2 mt-1 fill-yellow-500"
                    />
                    <div className="flex-1">{item.venue_name}</div>
                  </div>
                )}
                <div className="text-yellow-500 flex items-top mb-2">
                  <Icon
                    icon="INFO"
                    viewBox="0 0 16 16"
                    className="mr-2 mt-1 fill-yellow-500"
                  />
                  <div className="flex-1">{item.rating_score}</div>
                </div>
                <div className="text-yellow-500 flex items-top mb-2">
                  <Icon
                    icon="INFO"
                    viewBox="0 0 16 16"
                    className="mr-2 mt-1 fill-yellow-500"
                  />
                  <div className="flex-1">{item.global_rating_score}</div>
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
