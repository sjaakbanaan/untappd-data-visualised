import OverviewCardProperty from './OverviewCardProperty.jsx';

const OverviewCard = ({ item }) => {
  return (
    <div
      key={item.checkin_id}
      style={{
        backgroundImage: `url(${item.photo_url})`,
      }}
      className="block overflow-hidden bg-gray-800 bg-cover bg-center shadow-lg transition-transform duration-300 hover:scale-110 md:rounded-lg"
    >
      <a
        href={item.checkin_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block h-full min-h-96 ${item.photo_url && 'bg-gray-800/50'} p-4 pb-8 md:rounded-lg`}
      >
        <h2 className="mb-2 text-xl font-semibold text-white">{item.beer_name}</h2>
        <p className="mb-4">{item.brewery_name}</p>
        {item.beer_type && <OverviewCardProperty icon="BEER" value={item.beer_type} />}
        {item.created_at && (
          <OverviewCardProperty icon="CALENDAR" value={item.created_at} formatOutput />
        )}
        {item.venue_name && (
          <OverviewCardProperty icon="LOCATION" value={item.venue_name} />
        )}
        {item.rating_score && (
          <OverviewCardProperty
            icon="STAR"
            value={`${item.rating_score} / ${item.global_rating_score}`}
          />
        )}
        {item.tagged_friends && (
          <OverviewCardProperty
            icon="FRIENDS"
            value={item.tagged_friends.split(',').join(', ')}
          />
        )}
      </a>
    </div>
  );
};

export default OverviewCard;
