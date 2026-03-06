// Finds the entry in beerData with the highest value for a given numeric field.
const findTopByField = (data, field) => {
  let top = null;
  for (const item of data) {
    const val = item[field];
    if (val != null && (top === null || val > top[field])) {
      top = item;
    }
  }
  return top;
};

const formatGlobalVal = (val) => {
  if (val == null) return '—';
  if (val >= 1000000) return `${(val / 1000000).toFixed(2)}M+`;
  return val;
};

export const statsPopularCheckins = (filteredData) => {
  const hasPopularData = filteredData.some((d) => d.global_total_checkins != null);
  const topByCheckins = hasPopularData ? findTopByField(filteredData, 'global_total_checkins') : null;
  const topByUniqueUsers = hasPopularData ? findTopByField(filteredData, 'global_unique_users') : null;

  return [
    {
      key: 'Most checked-in',
      value: topByCheckins ? formatGlobalVal(topByCheckins.global_total_checkins) : null,
      suffix: topByCheckins ? topByCheckins.beer_name : null,
      suffixLink: topByCheckins && topByCheckins.beer_url ? topByCheckins.beer_url : null,
      hide: !hasPopularData || !topByCheckins,
    },
    {
      key: 'Most unique drinkers',
      value: topByUniqueUsers ? formatGlobalVal(topByUniqueUsers.global_unique_users) : null,
      suffix: topByUniqueUsers ? topByUniqueUsers.beer_name : null,
      suffixLink: topByUniqueUsers && topByUniqueUsers.beer_url ? topByUniqueUsers.beer_url : null,
      hide: !hasPopularData || !topByUniqueUsers,
    },
  ];
};
