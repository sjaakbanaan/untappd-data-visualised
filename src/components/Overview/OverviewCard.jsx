import OverviewCardProperty from './OverviewCardProperty';

const OverviewCard = ({ item }) => {
  return (
    <div
      key={item.checkin_id}
      className="group relative min-h-64 overflow-hidden bg-gray-800 shadow-lg md:rounded-lg"
    >
      {item.photo_url && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 origin-center bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-[1.2]"
            style={{ backgroundImage: `url(${item.photo_url})` }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] bg-gray-900 opacity-0 transition-opacity duration-1000 group-hover:opacity-80"
          />
        </>
      )}
      <a
        href={item.checkin_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative z-10 block h-full min-h-96 ${item.photo_url && 'bg-gray-800/50'} p-4 pb-8 md:rounded-lg md:p-6`}
      >
        <h2 className="mb-2 text-xl font-semibold text-white">{item.beer_name}</h2>
        <p className="mb-4">{item.brewery_name}</p>
        {item.created_at && (
          <OverviewCardProperty icon="CALENDAR" value={item.created_at} formatOutput />
        )}
        {item.venue_name && (
          <OverviewCardProperty icon="LOCATION" value={item.venue_name} />
        )}
        {item.beer_type && <OverviewCardProperty icon="BEER" value={item.beer_type} />}
        {item.rating_score && (
          <OverviewCardProperty
            icon="STAR"
            secondIcon="WORLD"
            secondValue={item.global_rating_score}
            value={item.rating_score}
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
