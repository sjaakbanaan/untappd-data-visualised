import OverviewCardProperty from './OverviewCardProperty.jsx';

const OverviewCard = ({ item }) => {
  return (
    <div
      key={item.checkin_id}
      style={{
        backgroundImage: `url(${item.photo_url})`,
      }}
      className="block overflow-hidden bg-cover bg-center shadow-md transition-transform duration-500 hover:scale-110 md:rounded-lg"
    >
      <a
        href={item.checkin_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full min-h-96 bg-gray-800/50 p-4 pb-8 md:rounded-lg"
      >
        <h2 className="mb-2 text-xl font-semibold text-white">{item.beer_name}</h2>
        <p className="mb-4">{item.brewery_name}</p>
        <OverviewCardProperty
          icon="BEER"
          viewBox="0 0 473.639 512"
          value={item.beer_type}
        />
        <OverviewCardProperty
          icon="CALENDAR"
          viewBox="0 0 488 512"
          value={item.created_at}
          formatOutput
        />
        {item.venue_name && (
          <OverviewCardProperty
            icon="LOCATION"
            viewBox="0 0 70.749 90"
            value={item.venue_name}
          />
        )}
        {item.rating_score && (
          <OverviewCardProperty
            icon="STAR"
            viewBox="0 0 512 512"
            value={`${item.rating_score} / ${item.global_rating_score}`}
          />
        )}
        {item.tagged_friends && (
          <OverviewCardProperty
            icon="FRIENDS"
            viewBox="0 0 512 398.108"
            value={item.tagged_friends.split(',').join(', ')}
          />
        )}
      </a>
    </div>
  );
};

export default OverviewCard;
