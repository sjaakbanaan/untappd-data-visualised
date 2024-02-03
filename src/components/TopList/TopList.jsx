import PropTypes from 'prop-types';
import { processTopBeers, processTaggedFriends } from './helpers/listProcessing';

const processingFunctions = {
  friends: processTaggedFriends,
  topBeers: processTopBeers,
  // Add more data types as needed
};

const TopList = ({ beerData, dataType, listTitle, scoreType }) => {
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
              <div className="flex items-center justify-between">
                <a href={item.checkin_url} target="_blank" rel="noopener">
                  {item.name}
                </a>
                <span className="text-gray-400">
                  {item.value}
                  {suffix}
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
