import { transformRatingData } from '../../../utils';

export const processTopBeers = (beerData, scoreType) => {
  const onEmpty = 'No beers to display, please change your search range.';
  const formattedData = transformRatingData(beerData, scoreType);
  const suffix = scoreType === 'beer_abv' ? '%' : '';

  // Use a Set to keep track of unique beer names
  const uniqueBeerNames = new Set();

  // Filter out duplicates based on beer name
  const uniqueFormattedData = formattedData.filter((item) => {
    if (uniqueBeerNames.has(item.name)) {
      return false; // Skip duplicate
    }
    uniqueBeerNames.add(item.name);
    return true;
  });

  const sortedData = [...uniqueFormattedData].sort((a, b) => b.value - a.value);
  const processedList = sortedData.slice(0, 10);
  return { processedList, onEmpty, suffix };
};

export const processTaggedFriends = (beerData) => {
  const suffix = ' times';
  const onEmpty =
    'No friends to display, are these checkins from before the launch of the "Tagged Friends" feature in 2017?';

  const allItemsArr = beerData.flatMap((item) =>
    item.tagged_friends
      ? item.tagged_friends.split(',').map((friend) => friend.trim())
      : []
  );

  const itemCount = allItemsArr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  const processedList = Object.keys(itemCount).map((item) => ({
    name: item,
    value: itemCount[item],
  }));

  processedList.sort((a, b) => b.value - a.value);

  return { processedList, suffix, onEmpty };
};
