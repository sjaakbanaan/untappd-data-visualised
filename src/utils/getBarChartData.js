export const getBarChartData = (beerData, dataType) => {
  let dataMap = {};
  // Process brewery names
  dataMap = beerData.reduce((acc, item) => {
    const itemValue = item[dataType] || 'Unknown';
    acc[itemValue] = (acc[itemValue] || 0) + 1;
    return acc;
  }, {});

  // Convert to array of objects
  const dataList = Object.keys(dataMap)
    .filter((name) => name !== 'Unknown') // Exclude items where name is "Unknown"
    .map((name) => ({
      name,
      value: dataMap[name],
    }));

  return dataList;
};
