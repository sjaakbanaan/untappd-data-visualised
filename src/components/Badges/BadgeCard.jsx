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

export default BadgeCard;