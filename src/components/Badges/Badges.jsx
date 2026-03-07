import { useState, useContext } from 'react';
import { DataContext } from '../../DataContext';
import BadgeCard from './BadgeCard';

const PAGE_SIZE = 50;

const Badges = () => {
  const { badgeData } = useContext(DataContext);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [query, setQuery] = useState('');
  const [groupByLevel, setGroupByLevel] = useState(false);

  if (!badgeData || badgeData.length === 0) {
    return (
      <div className="lg:col-span-2">
        <p className="text-center text-gray-400">No badge data available.</p>
      </div>
    );
  }

  // Filter only when 3+ characters have been typed
  const activeQuery = query.length >= 3 ? query.toLowerCase() : '';
  const filtered = activeQuery
    ? badgeData.filter((b) => b.baseName.toLowerCase().includes(activeQuery))
    : badgeData;

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setVisible(PAGE_SIZE); // reset pagination on new search
  };

  const getLevelGroup = (level) => {
    if (level === null || level === undefined) return 'No level';
    if (level === 0) return 'Level 0';
    if (level >= 100) return 'Level 100';
    const start = Math.ceil(level / 10) * 10 - 9;
    const end = Math.min(start + 9, 99);
    return `Level ${start} - ${end}`;
  };

  const groupedBadges = (() => {
    if (!groupByLevel) return null;
    const groups = [];
    const groupMap = new Map();
    
    shown.forEach((badge) => {
      const groupName = getLevelGroup(badge.level);
      if (!groupMap.has(groupName)) {
        groupMap.set(groupName, []);
        groups.push(groupName);
      }
      groupMap.get(groupName).push(badge);
    });
    
    return { groups, groupMap };
  })();

  return (
    <div className="lg:col-span-2">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Badges{' '}
          <span className="ml-2 rounded-full bg-yellow-500/20 px-3 pb-1 text-sm font-semibold text-yellow-400">
            {filtered.length}
          </span>
        </h2>
        <p className="mt-4 text-sm text-gray-400">
          Your highest-level achievements, sorted from the top.
        </p>

        {/* Search and Options */}
        <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            id="badge-search"
            name="badge-search"
            type="search"
            value={query}
            onChange={handleSearch}
            placeholder="Search badges… (min. 3 characters)"
            className="w-full max-w-xs rounded border border-gray-600 bg-gray-800 px-3 py-1.5 text-sm text-white outline-none transition-colors duration-200 placeholder:text-gray-500 focus:border-yellow-500"
          />
          <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-400 hover:text-gray-300">
            <input
              type="checkbox"
              checked={groupByLevel}
              onChange={(e) => setGroupByLevel(e.target.checked)}
              className="size-4 accent-yellow-500"
            />
            Group by level (steps of 10)
          </label>
        </div>
      </div>

      {/* Grid */}
      {!groupByLevel ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {shown.length > 0 ? (
            shown.map((badge) => (
              <BadgeCard key={badge.baseName} badge={badge} />
            ))
          ) : (
            <p className="col-span-full text-center text-sm text-gray-400">
              No badges found for &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {shown.length > 0 ? (
            groupedBadges.groups.map((groupName) => (
              <div key={groupName}>
                <h3 className="mb-3 border-b border-gray-700 pb-2 text-lg font-semibold text-white">
                  {groupName}
                  <span className="ml-3 rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-semibold text-yellow-400">
                    {groupedBadges.groupMap.get(groupName).length}
                  </span>
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {groupedBadges.groupMap.get(groupName).map((badge) => (
                    <BadgeCard key={badge.baseName} badge={badge} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-400">
              No badges found for &ldquo;{query}&rdquo;.
            </p>
          )}
        </div>
      )}

      {/* Show more */}
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded border border-yellow-500 px-6 py-2 text-sm font-semibold text-yellow-400 transition-colors duration-200 hover:bg-yellow-500 hover:text-gray-900"
          >
            Show more ({filtered.length - visible} remaining)
          </button>
        </div>
      )}
    </div>
  );
};

export default Badges;
