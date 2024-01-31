import OverviewCardPropery from './OverviewCardPropery.jsx';

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
                <OverviewCardPropery icon="INFO" value={item.beer_type} />
                <OverviewCardPropery icon="INFO" value={item.created_at} formatOutput />
                {item.venue_name && (
                  <OverviewCardPropery icon="INFO" value={item.venue_name} />
                )}
                <OverviewCardPropery icon="INFO" value={item.rating_score} />
                <OverviewCardPropery icon="INFO" value={item.global_rating_score} />
              </a>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
