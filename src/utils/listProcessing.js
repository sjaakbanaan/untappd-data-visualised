import { transformRatingData } from '.';

export const processTopBeers = (beerData, scoreType, count = 10, order = 'asc') => {
  const onEmpty = 'No beers to display, please change your search range.';
  const formattedData = transformRatingData(beerData, scoreType);
  const suffix = scoreType === 'beer_abv' ? '%' : '';

  // Create a map to store the highest value for each beer ID
  const highestValuesMap = new Map();

  // Iterate over the formatted data to update the highest value for each beer ID
  formattedData.forEach((item) => {
    const { bid, value } = item;
    if (!highestValuesMap.has(bid) || value > highestValuesMap.get(bid)) {
      highestValuesMap.set(bid, value);
    }
  });

  // Filter the formatted data to keep only items with the highest value for each beer ID
  const deduplicatedData = formattedData.reduce((acc, current) => {
    const existingItem = acc.find((item) => item.bid === current.bid);
    if (!existingItem || current.value > existingItem.value) {
      acc = acc.filter((item) => item.bid !== current.bid);
      acc.push(current);
    }
    return acc;
  }, []);

  // Sort the data based on value (descending for top, ascending for lowest)
  const sortedData =
    order === 'desc'
      ? deduplicatedData.sort((a, b) => a.value - b.value)
      : deduplicatedData.sort((a, b) => b.value - a.value);

  // Get the top or lowest `count` items
  const processedList = sortedData.slice(0, count);

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

export const processFlavorProfiles = (beerData) => {
  const suffix = ' times';
  const onEmpty =
    'No flavor profiles to display, are these checkins from before the launch of the "Tagged Friends"?';

  const allItemsArr = beerData.flatMap((item) =>
    item.flavor_profiles
      ? item.flavor_profiles.split(',').map((flavor) => flavor.trim())
      : []
  );

  const itemCount = allItemsArr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  const sortedData = Object.keys(itemCount).map((item) => ({
    name: item,
    value: itemCount[item],
  }));

  sortedData.sort((a, b) => b.value - a.value);
  const processedList = sortedData.slice(0, 10);

  return { processedList, suffix, onEmpty };
};

export const processTopbyRating = (beerData, scoreType, minimumCheckins, ratingType) => {
  const suffix = '';
  const onEmpty = 'Not enough results to display.';
  // Filter entry value (i.e. brewery_name or beer_type) with at least {minimumCheckins} beers
  const reoccuringEntries = beerData.reduce((acc, beer) => {
    acc[beer[scoreType]] = (acc[beer[scoreType]] || 0) + 1;
    return acc;
  }, {});
  const eligibleEntries = Object.keys(reoccuringEntries).filter(
    (entryName) => reoccuringEntries[entryName] >= minimumCheckins
  );

  // Calculate average rating score for each eligible enty
  const topRatingMap = eligibleEntries.map((entryName) => {
    const entrieBeers = beerData.filter((beer) => beer[scoreType] === entryName);
    const totalRating = entrieBeers.reduce(
      (sum, beer) => sum + (+beer[ratingType] || 0),
      0
    );
    const averageRating = entrieBeers.length > 0 ? totalRating / entrieBeers.length : 0;
    return { name: entryName, value: averageRating.toFixed(2) };
  });

  // Sort breweries by rating in descending order
  topRatingMap.sort((a, b) => b.value - a.value);

  // Select top 10 breweries
  const processedList = topRatingMap.slice(0, 10);

  return { processedList, suffix, onEmpty };
};
