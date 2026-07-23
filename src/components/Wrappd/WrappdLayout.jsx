import PropTypes from 'prop-types';
import { useAutoScroll } from '../../utils/useAutoScroll';
import WrappdCardHero from './WrappdCardHero';
import WrappdCardStats from './WrappdCardStats';
import WrappdCardMap from './WrappdCardMap';
import WrappdPhotos from './WrappdPhotos';
import WrappdTopStats from './WrappdTopStats';
import WrappdFooter from './WrappdFooter';
import StackCard from './StackCard';

const WrappdLayout = ({
  userName,
  userAvatar,
  dateRange,
  stats,
  topLists,
  filterOverview,
  filterYears = [],
  shareLinkTitle,
  venueLocations,
}) => {
  const layoutRef = useAutoScroll();

  // Beer photos from the Top 5 beers list
  const photosList = topLists.find((item) => item.title === 'Top 5 beers');
  const hasPhotos = photosList?.items?.filter((i) => i.photo_url).length >= 5;
  const hasMap = venueLocations && venueLocations.length > 0;

  // Total beers used for the hero background decoration
  const totalBeersStat = stats.find((s) => s.key === 'Total beers');
  const totalBeers = totalBeersStat?.value ?? '';

  // Build the card list dynamically so we can get the right --numcards count
  const cards = [
    {
      key: 'hero',
      bg: 'bg-gray-900',
      content: (
        <WrappdCardHero
          userName={userName}
          userAvatar={userAvatar}
          dateRange={dateRange}
          filterOverview={filterOverview}
          filterYears={filterYears}
          shareLinkTitle={shareLinkTitle}
          totalBeers={totalBeers}
        />
      ),
    },
    {
      key: 'stats',
      bg: 'bg-gray-900',
      content: <WrappdCardStats stats={stats} dateRange={dateRange} />,
    },
    ...(hasPhotos
      ? [
          {
            key: 'photos',
            bg: 'bg-gray-900',
            content: (
              <div className="p-8 md:p-14">
                <div className="mb-8 flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label="Photos">
                    📸
                  </span>
                  <h2 className="text-xl font-bold text-wrappdYellow">Top Beer Photos</h2>
                  <div className="h-px flex-1 bg-gray-700" />
                </div>
                <WrappdPhotos photosList={photosList} />
              </div>
            ),
          },
        ]
      : []),
    ...(hasMap
      ? [
          {
            key: 'map',
            bg: 'bg-gray-950',
            content: <WrappdCardMap venueLocations={venueLocations} />,
          },
        ]
      : []),
    {
      key: 'toplists',
      bg: 'bg-gray-900',
      content: (
        <div className="flex flex-col justify-between p-8 md:p-14">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <span className="text-2xl" role="img" aria-label="Top lists">
                🏆
              </span>
              <h2 className="text-xl font-bold text-wrappdYellow">Your Top 5s</h2>
              <div className="h-px flex-1 bg-gray-700" />
            </div>
            <div className="grid gap-10 md:grid-cols-2">
              {topLists.map((topList, index) => (
                <WrappdTopStats
                  key={index}
                  title={topList.title}
                  items={topList.items.slice(0, 5)}
                  valueKey={topList.valueKey}
                  suffix={topList.suffix}
                />
              ))}
            </div>
          </div>
          <div className="mt-14 border-t border-gray-800 pt-10">
            <WrappdFooter />
          </div>
        </div>
      ),
    },
  ];

  const numCards = cards.length;

  return (
    <div ref={layoutRef} className="px-2 py-8 md:px-0 md:pb-0 md:pt-16">
      <ul
        id="wrappd-cards"
        className="mx-auto flex list-none flex-col p-0 md:max-w-screen-sm md:pb-16 lg:max-w-screen-md xl:max-w-screen-lg"
      >
        {cards.map(({ key, bg, content }, i) => (
          <StackCard
            key={key}
            index={i + 1}
            numCards={numCards}
            extraClass={i !== numCards - 1 ? 'mb-10' : ''}
            bg={bg}
          >
            {content}
          </StackCard>
        ))}
      </ul>
    </div>
  );
};

WrappdLayout.propTypes = {
  userName: PropTypes.string.isRequired,
  userAvatar: PropTypes.string,
  dateRange: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }).isRequired,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      suffix: PropTypes.string,
    })
  ).isRequired,
  topLists: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    })
  ).isRequired,
  filterOverview: PropTypes.object.isRequired,
  filterYears: PropTypes.arrayOf(PropTypes.number),
  shareLinkTitle: PropTypes.string,
  venueLocations: PropTypes.array,
};

export default WrappdLayout;
