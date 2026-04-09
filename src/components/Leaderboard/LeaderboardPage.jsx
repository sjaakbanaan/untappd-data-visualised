import { useEffect, useState, useMemo } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import ReactGA from 'react-ga4';
import { db } from '../../firebase';

const MEDAL = ['🥇', '🥈', '🥉'];

const formatDate = (iso) => {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const LeaderboardPage = () => {
  const [rawEntries, setRawEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortKey, setSortKey] = useState('uniqueCheckins');
  const [sortDir, setSortDir] = useState('desc');

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/leaderboard', title: 'Leaderboard' });
  }, []);

  // Fetch once — all sorting is done client-side
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(collection(db, 'leaderboard'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter(
            (entry) =>
              !entry.hideFromLeaderboard &&
              entry.untappd_username &&
              entry.untappd_username !== 'Unknown'
          );
        setRawEntries(data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch leaderboard:', err);
        setError('Failed to load leaderboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Clicking active column toggles direction; switching column resets to desc
  const handleSort = (key) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  // Sort client-side — instant, no re-fetch, no Firestore index needed
  const entries = useMemo(() => {
    const sorted = [...rawEntries].sort((a, b) => (b[sortKey] ?? 0) - (a[sortKey] ?? 0));
    return sortDir === 'asc' ? sorted.reverse() : sorted;
  }, [rawEntries, sortKey, sortDir]);

  // True rank by sortKey desc — always #1 = highest, regardless of display direction
  const rankMap = useMemo(() => {
    const sorted = [...rawEntries].sort((a, b) => (b[sortKey] ?? 0) - (a[sortKey] ?? 0));
    const map = {};
    sorted.forEach((entry, i) => {
      map[entry.id] = i + 1;
    });
    return map;
  }, [rawEntries, sortKey]);

  // Podium is always top 3 by CURRENT sort key - keeps dashboard consistent
  const podiumEntries = useMemo(
    () =>
      [...rawEntries].sort((a, b) => (b[sortKey] ?? 0) - (a[sortKey] ?? 0)).slice(0, 3),
    [rawEntries, sortKey]
  );

  const columns = [
    { key: 'uniqueCheckins', label: '🍺 Unique Beers' },
    { key: 'totalCheckins', label: '📋 Total Check-ins' },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-4xl font-black text-yellow-500">Leaderboard</h2>
        <p className="text-gray-400">See who&apos;s on top of Tappd!</p>
      </div>

      {/* Sort toggle */}
      <div className="mb-6 flex justify-center gap-3">
        {columns.map((col) => (
          <button
            key={col.key}
            onClick={() => handleSort(col.key)}
            className={`rounded-full px-5 py-2 text-sm font-bold transition-all duration-200 ${
              sortKey === col.key
                ? 'bg-yellow-500 text-black shadow-lg'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {col.label}
          </button>
        ))}
      </div>

      {/* State: loading */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-20 text-yellow-500">
          <div className="size-12 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent" />
          <p className="text-xl font-bold">Loading leaderboard...</p>
        </div>
      )}

      {/* State: error */}
      {!loading && error && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-center text-red-400">
          {error}
        </div>
      )}

      {/* State: empty */}
      {!loading && !error && entries.length === 0 && (
        <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-10 text-center text-gray-400">
          No leaderboard data yet. Import some beer data to get started!
        </div>
      )}

      {/* Leaderboard table */}
      {!loading && !error && entries.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-gray-700/60 bg-gray-800/60 shadow-2xl backdrop-blur">
          {/* Top 3 podium cards — always sorted by unique beers, unaffected by table sort */}
          {podiumEntries.length >= 1 && (
            <div className="flex flex-col border-b border-gray-700/60 sm:flex-row">
              {/* Note: we reorder them visually if we want 2nd-1st-3rd style, but for now linear is fine */}
              {podiumEntries.map((entry, idx) => (
                <div
                  key={entry.id}
                  className={`relative flex flex-1 flex-col items-center gap-1 p-8 text-center transition-all sm:p-6 ${
                    idx === 0
                      ? 'z-10 bg-yellow-500/15 ring-2 ring-yellow-500/20'
                      : idx === 1
                        ? 'bg-gray-700/30'
                        : 'bg-amber-900/10'
                  }`}
                >
                  <span className={`text-4xl ${idx === 0 ? 'scale-125' : ''}`}>
                    {MEDAL[idx]}
                  </span>
                  <span
                    className={`mt-2 font-black text-white ${idx === 0 ? 'text-xl' : 'text-lg'}`}
                  >
                    {entry.untappd_username}
                  </span>
                  <span
                    className={`font-black ${idx === 0 ? 'text-4xl text-yellow-500' : 'text-3xl text-gray-300'}`}
                  >
                    {(entry[sortKey] ?? 0).toLocaleString()}
                  </span>
                  <span className="text-xs font-medium uppercase tracking-tighter text-gray-500">
                    {columns.find((c) => c.key === sortKey)?.label.split(' ')[1]}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Full ranked table */}
          <div className="overflow-x-scroll overflow-y-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700/60 text-left text-xs font-bold uppercase tracking-widest text-gray-500">
                  <th className="px-6 py-4">#</th>
                  <th className="px-6 py-4">Username</th>
                  <th
                    className={`cursor-pointer px-6 py-4 text-right transition-colors hover:text-yellow-400 ${sortKey === 'uniqueCheckins' ? 'text-yellow-500' : ''}`}
                    onClick={() => handleSort('uniqueCheckins')}
                  >
                    Unique Beers{' '}
                    {sortKey === 'uniqueCheckins' ? (
                      sortDir === 'desc' ? (
                        '↓'
                      ) : (
                        '↑'
                      )
                    ) : (
                      <span className="opacity-30">↕</span>
                    )}
                  </th>
                  <th
                    className={`cursor-pointer px-6 py-4 text-right transition-colors hover:text-yellow-400 ${sortKey === 'totalCheckins' ? 'text-yellow-500' : ''}`}
                    onClick={() => handleSort('totalCheckins')}
                  >
                    Total Check-ins{' '}
                    {sortKey === 'totalCheckins' ? (
                      sortDir === 'desc' ? (
                        '↓'
                      ) : (
                        '↑'
                      )
                    ) : (
                      <span className="opacity-30">↕</span>
                    )}
                  </th>
                  <th className="hidden px-6 py-4 text-right md:table-cell">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-gray-700/40 transition-colors last:border-0 hover:bg-gray-700/30 ${rankMap[entry.id] <= 3 ? 'font-semibold' : ''}`}
                  >
                    <td className="px-6 py-4 text-gray-500">
                      <span
                        className={
                          rankMap[entry.id] <= 3
                            ? 'font-bold text-yellow-500/70'
                            : 'text-gray-600'
                        }
                      >
                        #{rankMap[entry.id]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`https://untappd.com/user/${entry.untappd_username}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white transition-colors hover:text-yellow-500"
                      >
                        {entry.untappd_username}
                      </a>
                    </td>
                    <td
                      className={`px-6 py-4 text-right ${sortKey === 'uniqueCheckins' ? 'font-bold text-yellow-400' : 'text-gray-300'}`}
                    >
                      {(entry.uniqueCheckins ?? 0).toLocaleString()}
                    </td>
                    <td
                      className={`px-6 py-4 text-right ${sortKey === 'totalCheckins' ? 'font-bold text-yellow-400' : 'text-gray-300'}`}
                    >
                      {(entry.totalCheckins ?? 0).toLocaleString()}
                    </td>
                    <td className="hidden px-6 py-4 text-right text-gray-600 md:table-cell">
                      {formatDate(entry.lastUpdated)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-700/40 px-6 py-3 text-right text-xs text-gray-600">
            {entries.length} participant{entries.length !== 1 ? 's' : ''}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardPage;
