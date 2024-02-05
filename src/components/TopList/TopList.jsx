import PropTypes from 'prop-types';
import {
  processTopBeers,
  processTaggedFriends,
  processFlavorProfiles,
  processFlavorProfileCombis,
} from './helpers/listProcessing';

const processingFunctions = {
  friends: processTaggedFriends,
  topBeers: processTopBeers,
  flavorProfiles: processFlavorProfiles,
  flavorProfileCombis: processFlavorProfileCombis,
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
  const processingFunction = processingFunctions[dataType] || processTopBeers;
  // add a possible second argument as extra filter
  const scoreTypeVal = scoreType ?? '';
  const getList = processingFunction(beerData, scoreTypeVal);
  const { processedList, suffix, onEmpty } = getList;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-white">{listTitle}</h2>
      <ul className="divide-y divide-gray-700">
        {processedList.length > 0 ? (
          processedList.map((item, i) => (
            <li key={i} className="py-2">
              <div
                className={`flex items-center justify-between  ${lowerCase && 'lowercase'}`}
              >
                <a href={item.checkin_url} target="_blank" rel="noopener">
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
