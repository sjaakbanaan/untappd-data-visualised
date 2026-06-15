import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { collection, getDocs, query } from 'firebase/firestore';
import StatCard from './StatCard';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { useBasicStats } from '../../utils/useBasicStats';
import { getDateRangeDayCount } from '../../utils/getDateRangeDayCount';

const DEMO_COMPARISON_USER_ID = '__demo_comparison_user__';

const getCheckinDate = (item) => item?.created_at?.split(' ')[0] || null;

const filterDataByDateRange = (data, filterDateRange) =>
  data.filter((item) => {
    const itemDate = getCheckinDate(item);
    return (
      itemDate &&
      (!filterDateRange.start || itemDate >= filterDateRange.start) &&
      (!filterDateRange.end || itemDate <= filterDateRange.end)
    );
  });

const hasFullRangeCoverage = (entry, filterDateRange) => {
  if (!entry?.firstCheckinDate || !entry?.lastCheckinDate) return false;

  return (
    (!filterDateRange.start || entry.firstCheckinDate <= filterDateRange.start) &&
    (!filterDateRange.end || entry.lastCheckinDate >= filterDateRange.end)
  );
};

const formatCoverageDate = (date) =>
  date
    ? new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null;

const getDataCoverage = (data) => {
  const dates = data.map(getCheckinDate).filter(Boolean).sort();

  return {
    firstCheckinDate: dates[0] || null,
    lastCheckinDate: dates[dates.length - 1] || null,
  };
};

const getDaysCoverage = (days) => {
  const dates = days
    .map((day) => day.date)
    .filter(Boolean)
    .sort();

  return {
    firstCheckinDate: dates[0] || null,
    lastCheckinDate: dates[dates.length - 1] || null,
  };
};

const formatGlobalVal = (val) => {
  if (val == null) return null;
  if (val >= 1000000) return `${(val / 1000000).toFixed(2)}M+`;
  return val;
};

const addAll = (target, values) => {
  if (Array.isArray(values)) {
    values.forEach((value) => addToSet(target, value));
  }
};

const addToSet = (target, value) => {
  if (value !== undefined && value !== null && value !== '') {
    target.add(value);
  }
};

const getTopByValue = (items, key) =>
  items.reduce((top, item) => {
    if (!item || item[key] == null) return top;
    return !top || item[key] > top[key] ? item : top;
  }, null);

const buildStatsFromComparisonDays = (days, filterDateRange) => {
  const filteredDays = days.filter(
    (day) =>
      day.date &&
      (!filterDateRange.start || day.date >= filterDateRange.start) &&
      (!filterDateRange.end || day.date <= filterDateRange.end)
  );
  const sets = {
    uniqueBeerIds: new Set(),
    breweries: new Set(),
    beerStyles: new Set(),
    venues: new Set(),
    purchaseVenues: new Set(),
    cities: new Set(),
    countries: new Set(),
    breweryCountries: new Set(),
    friends: new Set(),
  };
  const totals = filteredDays.reduce(
    (acc, day) => {
      addAll(sets.uniqueBeerIds, day.uniqueBeerIds);
      addAll(sets.breweries, day.breweries);
      addAll(sets.beerStyles, day.beerStyles);
      addAll(sets.venues, day.venues);
      addAll(sets.purchaseVenues, day.purchaseVenues);
      addAll(sets.cities, day.cities);
      addAll(sets.countries, day.countries);
      addAll(sets.breweryCountries, day.breweryCountries);
      addAll(sets.friends, day.friends);

      return {
        total: acc.total + (day.total || 0),
        photos: acc.photos + (day.photos || 0),
        toasts: acc.toasts + (day.toasts || 0),
        comments: acc.comments + (day.comments || 0),
        ratingSum: acc.ratingSum + (day.ratingSum || 0),
        ratingCount: acc.ratingCount + (day.ratingCount || 0),
        globalRatingSum: acc.globalRatingSum + (day.globalRatingSum || 0),
        globalRatingCount: acc.globalRatingCount + (day.globalRatingCount || 0),
        higherThanGlobal: acc.higherThanGlobal + (day.higherThanGlobal || 0),
        lowerThanGlobal: acc.lowerThanGlobal + (day.lowerThanGlobal || 0),
      };
    },
    {
      total: 0,
      photos: 0,
      toasts: 0,
      comments: 0,
      ratingSum: 0,
      ratingCount: 0,
      globalRatingSum: 0,
      globalRatingCount: 0,
      higherThanGlobal: 0,
      lowerThanGlobal: 0,
    }
  );
  const totalDays = getDateRangeDayCount(filterDateRange) || 1;
  const uniqueBeerCount = sets.uniqueBeerIds.size;
  const avgRating = totals.ratingCount ? totals.ratingSum / totals.ratingCount : 0;
  const globalAvgRating = totals.globalRatingCount
    ? totals.globalRatingSum / totals.globalRatingCount
    : 0;
  const comparableRatings = totals.higherThanGlobal + totals.lowerThanGlobal;
  const percentageHigher = comparableRatings
    ? Math.round((totals.higherThanGlobal / comparableRatings) * 100)
    : 0;
  const percentageLower = comparableRatings
    ? Math.round((totals.lowerThanGlobal / comparableRatings) * 100)
    : 0;
  const mostCheckedIn = getTopByValue(
    filteredDays.map((day) => day.mostCheckedIn),
    'global_total_checkins'
  );
  const mostUniqueDrinkers = getTopByValue(
    filteredDays.map((day) => day.mostUniqueDrinkers),
    'global_unique_users'
  );
  const perCheckin = (value) =>
    totals.total > 0
      ? `${(value / totals.total).toFixed(2)} per checkin`
      : '0.00 per checkin';

  return [
    {
      key: 'Total beers',
      value: totals.total,
      suffix: `${(totals.total / totalDays).toFixed(2)} per day`,
    },
    {
      key: 'Unique beers',
      value: uniqueBeerCount,
      suffix:
        totals.total > 0
          ? `${((uniqueBeerCount / totals.total) * 100).toFixed(1)}%`
          : '0.0%',
    },
    { key: 'Total breweries', value: sets.breweries.size },
    { key: 'Beer styles', value: sets.beerStyles.size },
    {
      key: 'Average rating',
      value: avgRating.toFixed(2),
      suffix: `global rating: ${globalAvgRating.toFixed(2)}`,
    },
    {
      key: 'Venues drank at',
      value: sets.venues.size,
      suffix: perCheckin(sets.venues.size),
    },
    {
      key: 'Venues purchased',
      value: sets.purchaseVenues.size,
      suffix: perCheckin(sets.purchaseVenues.size),
    },
    { key: 'Cities drank in', value: sets.cities.size },
    { key: 'Countries drank in', value: sets.countries.size },
    { key: 'Brewery countries', value: sets.breweryCountries.size },
    { key: 'Photos added', value: totals.photos, suffix: perCheckin(totals.photos) },
    { key: 'Toasts received', value: totals.toasts, suffix: perCheckin(totals.toasts) },
    {
      key: 'Comments received',
      value: totals.comments,
      suffix: perCheckin(totals.comments),
    },
    { key: 'Total unique friends', value: sets.friends.size },
    {
      key: 'Years active',
      value: (totalDays / 365).toFixed(1),
    },
    { key: 'Days active', value: totalDays },
    {
      key: 'Rating vs. world',
      value: `${percentageHigher}%`,
      suffix: `${percentageLower}% lower`,
    },
    {
      key: 'Most checked-in',
      value: formatGlobalVal(mostCheckedIn?.global_total_checkins),
      suffix: mostCheckedIn?.beer_name,
      suffixLink: mostCheckedIn?.beer_url,
    },
    {
      key: 'Most unique drinkers',
      value: formatGlobalVal(mostUniqueDrinkers?.global_unique_users),
      suffix: mostUniqueDrinkers?.beer_name,
      suffixLink: mostUniqueDrinkers?.beer_url,
    },
  ].filter((stat) => stat.value !== null && stat.value !== undefined);
};

const buildDemoComparisonData = (data) => {
  const demoData = data.map((item, index) => ({
    ...item,
    checkin_id: `demo-${item.checkin_id || index}`,
    rating_score:
      typeof item.rating_score === 'number'
        ? Math.max(0, Math.min(5, item.rating_score - 0.15))
        : item.rating_score,
    total_toasts:
      typeof item.total_toasts === 'number'
        ? Math.max(0, Math.round(item.total_toasts * 1.35))
        : item.total_toasts,
    total_comments:
      typeof item.total_comments === 'number'
        ? Math.max(0, Math.round(item.total_comments * 0.7))
        : item.total_comments,
  }));

  const bonusCheckins = data
    .filter((_, index) => index % 9 === 0)
    .map((item, index) => ({
      ...item,
      bid: Number.isFinite(Number(item.bid))
        ? Number(item.bid) + 1000000 + index
        : 1000000 + index,
      beer_name: `${item.beer_name || 'Beer'} Demo Reserve`,
      beer_type: item.beer_type ? `Demo ${item.beer_type}` : 'Demo Special',
      brewery_name: `Demo Brewery ${index + 1}`,
      checkin_id: `demo-bonus-${item.checkin_id || index}`,
      rating_score:
        typeof item.rating_score === 'number'
          ? Math.max(0, Math.min(5, item.rating_score + 0.35))
          : item.rating_score,
      total_toasts:
        typeof item.total_toasts === 'number'
          ? Math.max(0, Math.round(item.total_toasts * 1.8))
          : item.total_toasts,
      total_comments:
        typeof item.total_comments === 'number'
          ? Math.max(0, Math.round(item.total_comments * 0.6))
          : item.total_comments,
    }));

  return [...demoData, ...bonusCheckins];
};

const BasicStats = ({ filteredData, filterDateRange, fullBeerData }) => {
  const { user } = useAuth();
  const { stats } = useBasicStats(filteredData, filterDateRange, fullBeerData);
  const [comparisonUsers, setComparisonUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [comparisonData, setComparisonData] = useState([]);
  const [comparisonLoading, setComparisonLoading] = useState(false);
  const [comparisonError, setComparisonError] = useState('');

  const selectedUser = useMemo(
    () => comparisonUsers.find((entry) => entry.id === selectedUserId) || null,
    [comparisonUsers, selectedUserId]
  );
  const comparisonFilteredData = useMemo(
    () => filterDataByDateRange(comparisonData, filterDateRange),
    [comparisonData, filterDateRange]
  );
  const comparisonStatsDays = useMemo(
    () =>
      Array.isArray(selectedUser?.comparisonStatsDays)
        ? selectedUser.comparisonStatsDays
        : [],
    [selectedUser]
  );
  const hasComparisonStatsDays = comparisonStatsDays.length > 0;
  const { stats: rawComparisonStats } = useBasicStats(
    comparisonFilteredData,
    filterDateRange,
    comparisonData
  );
  const comparisonStats = useMemo(
    () =>
      hasComparisonStatsDays
        ? buildStatsFromComparisonDays(comparisonStatsDays, filterDateRange)
        : rawComparisonStats,
    [comparisonStatsDays, filterDateRange, hasComparisonStatsDays, rawComparisonStats]
  );
  const comparisonStatsByKey = useMemo(
    () => new Map(comparisonStats.map((item) => [item.key, item])),
    [comparisonStats]
  );
  const comparisonCoverage = useMemo(
    () =>
      hasComparisonStatsDays
        ? getDaysCoverage(comparisonStatsDays)
        : comparisonData.length > 0
          ? getDataCoverage(comparisonData)
          : {
              firstCheckinDate: selectedUser?.firstCheckinDate || null,
              lastCheckinDate: selectedUser?.lastCheckinDate || null,
            },
    [comparisonData, comparisonStatsDays, hasComparisonStatsDays, selectedUser]
  );
  const hasComparisonCoverage = hasFullRangeCoverage(comparisonCoverage, filterDateRange);
  const hasComparisonRows =
    (hasComparisonStatsDays && comparisonStats.length > 0) ||
    comparisonFilteredData.length > 0;
  const canCompare =
    selectedUser &&
    hasComparisonCoverage &&
    hasComparisonRows &&
    !comparisonLoading &&
    !comparisonError;
  const coverageLabel =
    comparisonCoverage.firstCheckinDate && comparisonCoverage.lastCheckinDate
      ? `${formatCoverageDate(comparisonCoverage.firstCheckinDate)} to ${formatCoverageDate(
          comparisonCoverage.lastCheckinDate
        )}`
      : null;
  const showCoverageWarning =
    selectedUser &&
    !comparisonLoading &&
    !comparisonError &&
    hasComparisonRows &&
    !hasComparisonCoverage;

  useEffect(() => {
    let cancelled = false;

    const fetchComparisonUsers = async () => {
      try {
        const snapshot = await getDocs(query(collection(db, 'leaderboard')));
        const users = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter(
            (entry) =>
              entry.id !== user?.uid &&
              !entry.hideFromLeaderboard &&
              entry.untappd_username &&
              entry.untappd_username !== 'Unknown'
          )
          .sort((a, b) => a.untappd_username.localeCompare(b.untappd_username));
        const demoUser =
          import.meta.env.DEV && fullBeerData.length > 0
            ? {
                id: DEMO_COMPARISON_USER_ID,
                untappd_username: 'DemoComparisonUser',
                hideFromLeaderboard: false,
                comparisonStoragePath: DEMO_COMPARISON_USER_ID,
                ...getDataCoverage(fullBeerData),
              }
            : null;

        if (!cancelled) {
          setComparisonUsers(demoUser ? [demoUser, ...users] : users);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch comparison users:', error);
        if (!cancelled) {
          setComparisonError('Could not load comparison users.');
        }
      }
    };

    fetchComparisonUsers();

    return () => {
      cancelled = true;
    };
  }, [fullBeerData, user?.uid]);

  useEffect(() => {
    let cancelled = false;

    const fetchComparisonData = async () => {
      setComparisonData([]);
      setComparisonError('');
      setComparisonLoading(false);

      if (!selectedUserId || !selectedUser) return;

      setComparisonLoading(true);

      if (selectedUserId === DEMO_COMPARISON_USER_ID) {
        if (!cancelled) {
          setComparisonData(buildDemoComparisonData(fullBeerData));
          setComparisonLoading(false);
        }
        return;
      }

      if (hasComparisonStatsDays) {
        if (!cancelled) {
          setComparisonLoading(false);
        }
        return;
      }

      if (!cancelled) {
        setComparisonError(
          `${selectedUser.untappd_username} is visible, but has not published comparison data with the latest app version yet.`
        );
        setComparisonLoading(false);
      }
    };

    fetchComparisonData();

    return () => {
      cancelled = true;
    };
  }, [fullBeerData, hasComparisonStatsDays, selectedUser, selectedUserId]);

  return (
    <div>
      <div className="mb-6 border border-gray-700 bg-gray-800 p-5 shadow-lg md:rounded-lg md:p-6">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-black text-white">Compare stats</h3>
            <span className="rounded bg-yellow-500 px-2 py-1 text-xs font-black uppercase tracking-widest text-black">
              New
            </span>
          </div>
          <label htmlFor="stats-comparison-user" className="sr-only">
            Compare with
          </label>
          <div>
            <select
              id="stats-comparison-user"
              value={selectedUserId}
              onChange={(event) => setSelectedUserId(event.target.value)}
              className="w-full appearance-none rounded border border-gray-600 bg-gray-900 px-3 py-2 pr-10 text-white shadow focus:border-yellow-500 focus:outline-none md:min-w-72"
            >
              <option value="">Just me</option>
              {comparisonUsers.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.untappd_username}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedUser && !comparisonError && (
          <div className="mt-4 rounded border border-gray-700 bg-gray-900/40 px-4 py-3 text-sm text-gray-400">
            {comparisonLoading && (
              <span className="font-bold text-yellow-500">
                Loading comparison data...
              </span>
            )}
            {!comparisonLoading && coverageLabel && (
              <span>Public data from {coverageLabel}</span>
            )}
          </div>
        )}
        {showCoverageWarning && (
          <div className="mt-4 rounded border border-yellow-500/40 bg-yellow-500/10 p-3 text-sm text-yellow-100">
            {selectedUser.untappd_username} does not have public data for the full
            selected range. Pick a range within {coverageLabel || 'their available data'}
            to compare these stats.
          </div>
        )}
        {comparisonError && (
          <div className="mt-4 rounded border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
            {comparisonError}
          </div>
        )}
      </div>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {stats.length > 0 &&
          stats.map(
            (item, i) =>
              !item.hide && (
                <StatCard
                  key={i}
                  statKey={item.key}
                  value={item.value}
                  suffix={item.suffix}
                  suffixLink={item.suffixLink}
                  comparison={
                    canCompare && comparisonStatsByKey.has(item.key)
                      ? {
                          username: selectedUser.untappd_username,
                          value: comparisonStatsByKey.get(item.key).value,
                          suffix: comparisonStatsByKey.get(item.key).suffix,
                        }
                      : null
                  }
                />
              )
          )}
      </ul>
    </div>
  );
};

BasicStats.propTypes = {
  filteredData: PropTypes.array.isRequired,
  filterDateRange: PropTypes.object.isRequired,
  fullBeerData: PropTypes.array.isRequired,
};

export default BasicStats;
