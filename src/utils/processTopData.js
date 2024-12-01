import { normalizeString } from '.';

export const processTopData = (
  beerData,
  dataType,
  urlType = '',
  count = 10,
  // eslint-disable-next-line no-unused-vars
  skipHome = false
) => {
  let dataMap = {};
  // Get values for given dataType
  dataMap = beerData.reduce((acc, item) => {
    const itemValue = item[dataType] || 'Unknown';
    acc[itemValue] = (acc[itemValue] || 0) + 1;
    return acc;
  }, {});

  // Convert to array of objects
  const dataList = Object.keys(dataMap)
    .filter((name) => name !== 'Unknown') // Exclude items where name is "Unknown"
    .filter((name) => (skipHome ? name !== 'Untappd at Home' : name))
    .map((name) => {
      let foundEntry;
      let entryName;
      let entryUrl;

      switch (dataType) {
        case 'bid':
          foundEntry = beerData.find((entry) => entry.bid == name);
          entryName = foundEntry ? foundEntry.beer_name : name;
          break;
        case 'flavor_profiles':
          entryName = normalizeString(name);
          break;
        default:
          entryName = name;
      }

      if (urlType !== '') {
        entryUrl = beerData.find((entry) => entry[dataType] == name)?.[urlType];
      }

      return {
        name: entryName,
        count: dataMap[name],
        url: entryUrl,
      };
    });

  // Sort by count in descending order and take the top {count}
  const topItems = dataList.sort((a, b) => b.count - a.count).slice(0, count);

  // only needed for Chart data
  const labels = topItems.map((item) => {
    const countLabel = `(${item.count}×)`;
    return `${item.name} ${countLabel}`;
  });
  const topChartData = topItems.map((item) => item.count);

  return { labels, topChartData, topItems };
};
