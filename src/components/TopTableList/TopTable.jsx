import PropTypes from 'prop-types';
import {
  processTopBeers,
  processTaggedFriends,
  processFlavorProfiles,
  processTopbyRating,
} from '../../utils/listProcessing';
import { useCounter } from '../../utils/';

const processingFunctions = {
  friends: processTaggedFriends,
  topBeers: processTopBeers,
  flavorProfiles: processFlavorProfiles,
  topByRating: processTopbyRating,
};

const TopTable = ({ beerData, dataType, scoreType, selfCompare, lowerCase = false }) => {
  const initialMinimum = 3;
  const { count: minimumEntries, increment, decrement } = useCounter(initialMinimum);

  const processingFunction = processingFunctions[dataType] || processTopBeers;
  const scoreTypeVal = scoreType ?? '';
  const getList = processingFunction(beerData, scoreTypeVal, minimumEntries);
  const { processedList, suffix, onEmpty } = getList;

  return (
    <>
      <div className="flex items-center justify-between">
        {dataType == 'topByRating' && (
          <EntryCounter
            minimumEntries={minimumEntries}
            increment={increment}
            decrement={decrement}
          />
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
    </>
  );
};

TopTable.propTypes = {
  beerData: PropTypes.array.isRequired,
  dataType: PropTypes.string,
  title: PropTypes.string,
};

TopTable.defaultProps = {
  dataType: 'friends',
  title: 'No title',
};

export default TopTable;
