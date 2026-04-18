import PropTypes from 'prop-types';
import {
  processTopBeers,
  processTaggedFriends,
  processFlavorProfiles,
  processTopbyRating,
} from '../../utils/listProcessing';
import { useCounter } from '../../utils/';
import EntryCounter from './EntryCounter';
import NotificationBar from '../UI/NotificationBar';
import CardCarousel from '../UI/CardCarousel';

const processingFunctions = {
  friends: processTaggedFriends,
  flavorProfiles: processFlavorProfiles,
  topByRating: processTopbyRating,
  // if not on this list, default is: processTopBeers
};

const TopTable = ({
  beerData,
  dataType = 'friends',
  scoreType,
  selfCompare,
  lowerCase = false,
  ratingType,
  showPhotos,
}) => {
  const initMinimumCheckins = 3;
  const itemsToShow = 10;

  const {
    count: minimumCheckins,
    increment,
    decrement,
  } = useCounter(initMinimumCheckins);

  const processingFunction = processingFunctions[dataType] || processTopBeers;
  const scoreTypeVal = scoreType ?? '';
  const getList = processingFunction(
    beerData,
    scoreTypeVal,
    dataType == 'topByRating' ? minimumCheckins : itemsToShow,
    ratingType
  );
  const { processedList, suffix, onEmpty } = getList;

  if (processedList.length === 0) return <p>{onEmpty}</p>;

  return (
    <>
      {dataType == 'topByRating' && (
        <>
          <NotificationBar text="You can adjust the amount of checkins for this list." />
          <div className="flex items-center justify-between">
            <EntryCounter
              minimumCheckins={minimumCheckins}
              increment={increment}
              decrement={decrement}
            />
          </div>
        </>
      )}
      <CardCarousel
        cardSelector=".carousel-card"
        spread={200}
        galleryClassName="h-[420px] md:h-[480px]"
        cardsClassName="h-72 w-80 md:h-80 md:w-96"
      >
        {processedList.map((item, i) => (
          <li
            key={i}
            className="carousel-card absolute left-0 top-0 m-0 h-72 w-80 cursor-grab list-none overflow-hidden rounded-2xl bg-cover bg-center active:cursor-grabbing md:h-80 md:w-96"
            style={
              showPhotos && item.photo_url
                ? { backgroundImage: `url(${item.photo_url})` }
                : null
            }
          >
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex h-full flex-col items-center justify-center gap-2 p-5 text-center ${lowerCase ? 'lowercase' : ''} ${showPhotos && item.photo_url ? 'bg-gray-900/60' : ''}`}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
                #{i + 1}
              </span>
              <span className="text-balance text-[0.95rem] font-bold leading-tight text-white/90 md:text-[1.05rem]">
                {item.name}
              </span>
              <span className="stat-value-gradient text-3xl font-extrabold leading-none md:text-4xl">
                {item.value}
                {suffix}
              </span>
              {selfCompare && item.your_score !== undefined && (
                <div className="mt-1 flex flex-col items-center gap-0.5">
                  <span className="text-sm text-white/60">
                    You: <strong>{item.your_score}</strong>
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      item.your_score > item.value
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    ({item.your_score > item.value ? '+' : '-'}
                    {Math.abs(item.your_score - item.value).toFixed(2)})
                  </span>
                </div>
              )}
            </a>
          </li>
        ))}
      </CardCarousel>
    </>
  );
};

TopTable.propTypes = {
  beerData: PropTypes.array.isRequired,
  dataType: PropTypes.string,
};

export default TopTable;
