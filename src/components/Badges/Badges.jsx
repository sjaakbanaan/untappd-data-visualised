import { useState, useContext } from 'react';
import { DataContext } from '../../DataContext';

const PAGE_SIZE = 50;

/**
 * Renders a single badge card.
 */
const BadgeCard = ({ badge }) => {
  const { baseName, level, image_url } = badge;

  return (
    <div className="flex items-center gap-4 overflow-hidden rounded-lg border border-gray-700 bg-gray-800 p-4 transition-all duration-200 hover:border-yellow-500/60 hover:bg-gray-700">
      {image_url ? (
        <img
          src={image_url}
          alt={baseName}
          className="size-14 shrink-0 rounded-full object-cover ring-2 ring-yellow-500/40"
          loading="lazy"
        />
      ) : (
        <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-gray-700 ring-2 ring-yellow-500/40">
          <span className="text-2xl">🏅</span>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-white">{baseName}</p>
        {level !== null ? (
          <span className="mt-1 inline-block rounded bg-yellow-500/20 px-2 py-0.5 text-xs font-bold text-yellow-400">
            Level {level}
          </span>
        ) : (
          <span className="mt-1 inline-block rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-400">
            No level
          </span>
        )}
      </div>
    </div>
  );
};

const Badges = () => {
  const { badgeData } = useContext(DataContext);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [query, setQuery] = useState('');

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

        {/* Search */}
        <input
          id="badge-search"
          name="badge-search"
          type="search"
          value={query}
          onChange={handleSearch}
          placeholder="Search badges… (min. 3 characters)"
          className="mt-3 w-full max-w-xs rounded border border-gray-600 bg-gray-800 px-3 py-1.5 text-sm text-white outline-none transition-colors duration-200 placeholder:text-gray-500 focus:border-yellow-500"
        />
      </div>

      {/* Grid */}
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
