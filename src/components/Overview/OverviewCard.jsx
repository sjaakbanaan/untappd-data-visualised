import OverviewCardProperty from './OverviewCardProperty.jsx';

const OverviewCard = ({ item }) => {
  return (
    <div
      key={item.checkin_id}
      style={{
        backgroundImage: `url(${item.photo_url})`,
      }}
      className="block shadow-md bg-center bg-cover transition-transform duration-500 transform hover:scale-110 rounded-lg overflow-hidden hover:z-1"
    >
      <a
        href={item.checkin_url}
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 pb-8 block bg-gray-800 min-h-96 h-full rounded-lg bg-opacity-50"
      >
        <h2 className="text-xl text-white font-semibold mb-2">{item.beer_name}</h2>
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
