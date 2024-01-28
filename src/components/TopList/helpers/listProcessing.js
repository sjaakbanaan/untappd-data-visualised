import { transformRatingData } from '../../../utils';

export const processTopBeers = (beerData, scoreType) => {
  const onEmpty = 'No beers to display, please change your search range.';
  const formattedData = transformRatingData(beerData, scoreType);
  const suffix = scoreType == 'beer_abv' ? '%' : '';

  const sortedData = [...formattedData].sort((a, b) => b.value - a.value);
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

  const itemCount = allItemsArr.reduce((acc, friend) => {
    acc[friend] = (acc[friend] || 0) + 1;
    return acc;
  }, {});

  const processedList = Object.keys(itemCount).map((friend) => ({
    name: friend,
    value: itemCount[friend],
  }));

  processedList.sort((a, b) => b.value - a.value);

  return { processedList, suffix, onEmpty };
};
