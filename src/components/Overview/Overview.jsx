import { useState } from 'react';
import OverviewCardPropery from '../Overview/OverviewCardPropery.jsx';

const Overview = ({ beerData }) => {
  const [showOverview, setShowOverview] = useState(false);

  const handleToggleOverview = () => {
    setShowOverview(!showOverview);
  };

  // at how many results should the overview be hidden behind a button?
  const buttonNumber = 200;

  return (
    <>
      {beerData?.length > buttonNumber && (
        <div className="mt-6 mb-2 flex justify-center">
          <button
            className="bg-yellow-600 hover:bg-yellow-700 transition-colors duration-300 text-white font-bold py-3 px-5 rounded mr-2"
            onClick={handleToggleOverview}
          >
            {showOverview ? 'Hide Overview' : 'Show Overview'}
          </button>
        </div>
      )}
      {(showOverview || beerData?.length <= buttonNumber) && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-8">
          {beerData?.length > 0 &&
            beerData.map((item) => (
              <div
                key={item.checkin_id}
                style={{
                  backgroundImage: `url(${item.photo_url})`,
                }}
                className="block shadow-md bg-cover transition-transform duration-300 transform hover:scale-110 rounded-lg overflow-hidden"
              >
                <a
                  href={item.checkin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 block bg-gray-800 min-h-96 rounded-lg bg-opacity-50"
                >
                  <h2 className="text-xl text-white font-semibold mb-2">
                    {item.beer_name}
                  </h2>
                  <p className="mb-4">{item.brewery_name}</p>
                  <OverviewCardPropery
                    icon="BEER"
                    viewBox="0 0 473.639 512"
                    value={item.beer_type}
                  />
                  <OverviewCardPropery
                    icon="CALENDAR"
                    viewBox="0 0 488 512"
                    value={item.created_at}
                    formatOutput
                  />
                  {item.venue_name && (
                    <OverviewCardPropery
                      icon="LOCATION"
                      viewBox="0 0 70.749 90"
                      value={item.venue_name}
                    />
                  )}
                  <OverviewCardPropery
                    icon="STAR"
                    viewBox="0 0 512 512"
                    value={item.rating_score}
                  />
                  <OverviewCardPropery
                    icon="STAR"
                    viewBox="0 0 512 512"
                    value={item.global_rating_score}
                    suffix="global"
                  />
                </a>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default Overview;
