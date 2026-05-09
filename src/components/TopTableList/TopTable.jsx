import { useMemo } from 'react';
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
import SectionTransition from '../UI/SectionTransition';

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

  const getList = useMemo(() => {
    const processingFunction = processingFunctions[dataType] || processTopBeers;
    const scoreTypeVal = scoreType ?? '';
    return processingFunction(
      beerData,
      scoreTypeVal,
      dataType === 'topByRating' ? minimumCheckins : itemsToShow,
      ratingType
    );
  }, [beerData, dataType, scoreType, minimumCheckins, ratingType, itemsToShow]);

  const { processedList, suffix, onEmpty } = getList;

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
      <ul
        className={`${showPhotos ? 'grid grid-cols-2 gap-6' : 'divide-y divide-gray-700'}`}
      >
        <SectionTransition skipMove sectionKey={processedList}>
          {processedList.length > 0 ? (
            processedList.map((item, i) => (
              <li
                key={i}
                className={`${showPhotos ? 'group relative min-h-64 overflow-hidden bg-gray-800 shadow-lg md:rounded-lg' : 'py-2'}`}
              >
                {showPhotos && item.photo_url && (
                  <>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 z-0 origin-center bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-[1.2]"
                      style={{ backgroundImage: `url(${item.photo_url})` }}
                    />
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 z-[1] bg-gray-900 opacity-0 transition-opacity duration-[1000ms] group-hover:opacity-80"
                    />
                  </>
                )}
                <div
                  className={`flex h-full items-center justify-between ${showPhotos ? 'relative z-10 min-h-64' : ''} ${lowerCase && 'lowercase'}`}
                >
                  <a
                    href={item.url}
                    className={`${showPhotos && 'flex size-full flex-col items-center justify-center overflow-hidden bg-gray-800/50 p-4'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {showPhotos && <span>#{i + 1}</span>}
                    <span className="my-3 text-center text-lg">{item.name}</span>
                    {showPhotos && (
                      <span className="text-center text-3xl font-extrabold text-yellow-400">
                        {item.value}
                        {selfCompare && (
                          <>
                            <strong> / {item.your_score}</strong>
                            <div
                              className={
                                item.your_score > item.value
                                  ? 'text-lg text-green-700'
                                  : 'text-lg text-red-700'
                              }
                            >
                              ({item.your_score > item.value ? '+' : '-'}
                              {Math.abs(item.your_score - item.value).toFixed(2)})
                            </div>
                          </>
                        )}
                      </span>
                    )}
                  </a>
                  {!showPhotos && (
                    <span className="whitespace-nowrap text-gray-400">
                      {item.value}
                      {suffix}
                    </span>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p>{onEmpty}</p>
          )}
        </SectionTransition>
      </ul>
    </>
  );
};

TopTable.propTypes = {
  beerData: PropTypes.array.isRequired,
  dataType: PropTypes.string,
};

export default TopTable;
