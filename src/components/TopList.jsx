import PropTypes from 'prop-types';
import { transformRatingData } from '../utils';

const TopList = ({ beerData, dataType }) => {
  const processTopBeers = () => {
    const listTitle = 'Top rated beers';
    // Transform beerData into name and value format
    const formattedData = transformRatingData(beerData);

    // Sort formattedData based on value in descending order
    const sortedData = [...formattedData].sort((a, b) => b.value - a.value);

    // Take the top 10 items
    const processedList = sortedData.slice(0, 10);

    return { processedList, listTitle };
  };

  // Function to process tagged friends from all items and return a sorted list
  const processTaggedFriends = () => {
    const listTitle = 'Tagged Friends';
    const suffix = ' times';
    const onEmpty =
      'No friends to display, are these checkins from before the launch of the "Tagged Friends" feature in 2017?';
    const allItemsArr = beerData.flatMap((item) =>
      item.tagged_friends
        ? item.tagged_friends.split(',').map((friend) => friend.trim())
        : []
    );

    const itemCount = allItemsArr.reduce((acc, friend) => {
      acc[friend] = (acc[friend] || 0) + 1;
      return acc;
    }, {});

    // Convert to array of objects
    const processedList = Object.keys(itemCount).map((friend) => ({
      name: friend,
      value: itemCount[friend],
    }));

    // Sort by count in descending order
    processedList.sort((a, b) => b.value - a.value);

    return { processedList, listTitle, suffix, onEmpty };
  };

  const getList = dataType === 'friends' ? processTaggedFriends() : processTopBeers();

  const { processedList, listTitle, suffix, onEmpty } = getList;

  return (
    <div className="bg-gray-800 rounded p-4">
      <h2 className="text-lg font-semibold mb-4 text-white">{listTitle}:</h2>
      <ul className="divide-y divide-gray-700">
        {processedList.length > 0 ? (
          processedList.map((item, i) => (
            <li key={i} className="py-2">
              <div className="flex items-center justify-between">
                <span className="text-white">{item.name}</span>
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
};

TopList.defaultProps = {
  dataType: 'friends',
};

export default TopList;
