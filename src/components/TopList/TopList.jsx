import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  processTopBeers,
  processTaggedFriends,
  processFlavorProfiles,
  processFlavorProfileCombis,
  processDuplicateEntries,
  processTopbyRating,
} from './helpers/listProcessing';

const processingFunctions = {
  friends: processTaggedFriends,
  topBeers: processTopBeers,
  flavorProfiles: processFlavorProfiles,
  flavorProfileCombis: processFlavorProfileCombis,
  duplicateEntries: processDuplicateEntries,
  topByRating: processTopbyRating,
  // Add more data types as needed
};

const TopList = ({
  beerData,
  dataType,
  listTitle,
  scoreType,
  selfCompare,
  lowerCase = false,
}) => {
  function useCounter(initialValue = 0) {
    const [count, setCount] = useState(initialValue);

    const increment = () => {
      setCount(count + 1);
    };

    const decrement = () => {
      setCount(count - 1);
    };

    return { count, increment, decrement };
  }

  const initialMinimum = 3;
  const { count: minimumEntries, increment, decrement } = useCounter(initialMinimum);

  const processingFunction = processingFunctions[dataType] || processTopBeers;
  const scoreTypeVal = scoreType ?? '';
  const getList = processingFunction(beerData, scoreTypeVal, minimumEntries);
  const { processedList, suffix, onEmpty } = getList;

  return (
    <div className="p-4">
      <div className="flex  items-center justify-between">
        <h2 className="text-lg font-semibold mb-4 text-white">{listTitle} </h2>
        {dataType == 'topByRating' && (
          <div className="text-lf font-semibold text-gray-600 mb-3">
            at least {minimumEntries}
            <button
              className="px-2 border-2 border-gray-600 mx-2 font-bold"
              onClick={increment}
            >
              +
            </button>
            {minimumEntries > 1 && (
              <button
                className="px-2 border-2 border-gray-600 font-bold"
                onClick={decrement}
              >
                -
              </button>
            )}
          </div>
        )}
      </div>
      <ul className="divide-y divide-gray-700">
        {processedList.length > 0 ? (
          processedList.map((item, i) => (
            <li key={i} className="py-2">
              <div
                className={`flex items-center justify-between  ${lowerCase && 'lowercase'}`}
              >
                <a href={item.url} target="_blank" rel="noopener">
                  {item.name}
                </a>
                <span className="text-gray-400 whitespace-nowrap">
                  {item.value}
                  {suffix}
                  {selfCompare && (
                    <>
                      <strong> / {item.your_score}</strong>{' '}
                      <span
                        className={
                          item.your_score > item.value ? 'text-green-700' : 'text-red-700'
                        }
                      >
                        ({item.your_score > item.value ? '+' : '-'}
                        {Math.abs(item.your_score - item.value).toFixed(2)})
                      </span>
                    </>
                  )}
                </span>
              </div>
            </li>
          ))
        ) : (
          <p>{onEmpty}</p>
        )}
      </ul>
    </div>
  );
};

TopList.propTypes = {
  beerData: PropTypes.array.isRequired,
  dataType: PropTypes.string,
  listTitle: PropTypes.string,
};

TopList.defaultProps = {
  dataType: 'friends',
  listTitle: 'No title',
};

export default TopList;
