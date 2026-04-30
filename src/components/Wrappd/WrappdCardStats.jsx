import PropTypes from 'prop-types';

/**
 * Finds a stat by key from the saved stats array.
 */
const getStat = (stats, key) => stats.find((s) => s.key === key);

/**
 * A single big-number stat block.
 */
const StatBlock = ({ label, value, suffix, accent = false }) => {
  if (value === undefined || value === null) return null;
  return (
    <div className="flex flex-col">
      <span
        className={`text-3xl font-extrabold leading-none md:text-4xl ${accent ? 'text-wrappdYellow' : 'text-white'}`}
      >
        {value}
      </span>
      <span className="mt-1 text-sm font-semibold uppercase tracking-wider text-gray-400">
        {label}
      </span>
      {suffix && <span className="mt-0.5 text-xs text-gray-500">{suffix}</span>}
    </div>
  );
};

StatBlock.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  suffix: PropTypes.string,
  accent: PropTypes.bool,
};

/**
 * Section heading inside the stats card.
 */
const SectionHeading = ({ icon, title }) => (
  <div className="mb-6 flex items-center gap-3">
    <span className="text-2xl" role="img" aria-label={title}>
      {icon}
    </span>
    <h2 className="text-xl font-bold text-wrappdYellow">{title}</h2>
    <div className="h-px flex-1 bg-gray-700" />
  </div>
);

SectionHeading.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const WrappdCardStats = ({ stats, dateRange }) => {
  const totalDays =
    dateRange &&
    Math.round((new Date(dateRange.end) - new Date(dateRange.start)) / (1000 * 60 * 60 * 24));

  const total = getStat(stats, 'Total beers');
  const unique = getStat(stats, 'Unique beers');
  const breweries = getStat(stats, 'Total breweries');
  const styles = getStat(stats, 'Beer styles');
  const cities = getStat(stats, 'Cities drank in');
  const countries = getStat(stats, 'Countries drank in');
  const breweryCountries = getStat(stats, 'Brewery countries');
  const venues = getStat(stats, 'Venues drank at');
  const avgRating = getStat(stats, 'Average rating');
  const vsWorld = getStat(stats, 'Rating vs. world');
  const toasts = getStat(stats, 'Toasts received');
  const comments = getStat(stats, 'Comments received');
  const friends = getStat(stats, 'Total unique friends');
  const photos = getStat(stats, 'Photos added');
  const yearsActive = getStat(stats, 'Years active');
  const daysActive = getStat(stats, 'Days active');

  return (
    <div className="bg-gray-900 p-8 md:p-14">
      {/* ── Volume ─────────────────────────────────────────────── */}
      <div className="mb-14">
        <SectionHeading icon="🍺" title="Drinking in numbers" />
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <StatBlock
            accent
            label="Total check-ins"
            value={total?.value}
            suffix={`${(total?.value / totalDays).toFixed(2)} per day`}
          />
          <StatBlock
            label="Unique beers"
            value={unique?.value}
            suffix={unique?.suffix}
          />
          <StatBlock
            label="Days of drinking"
            value={daysActive?.value ?? totalDays}
          />
          {yearsActive && (
            <StatBlock label="Years active" value={yearsActive.value} />
          )}
        </div>
      </div>

      {/* ── Variety & Discovery ────────────────────────────────── */}
      <div className="mb-14">
        <SectionHeading icon="🌍" title="Variety & Discovery" />
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <StatBlock accent label="Breweries" value={breweries?.value} />
          <StatBlock label="Beer styles" value={styles?.value} />
          <StatBlock label="Venues" value={venues?.value} />
          <StatBlock label="Cities" value={cities?.value} />
          <StatBlock label="Countries" value={countries?.value} />
          <StatBlock label="Brewery countries" value={breweryCountries?.value} />
        </div>
      </div>

      {/* ── Ratings & Social ───────────────────────────────────── */}
      <div>
        <SectionHeading icon="⭐" title="Ratings & Social" />
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <StatBlock
            accent
            label="Avg. rating"
            value={avgRating?.value}
            suffix={avgRating?.suffix}
          />
          {vsWorld && (
            <StatBlock
              label="Higher than world"
              value={vsWorld.value}
              suffix={vsWorld.suffix}
            />
          )}
          <StatBlock
            label="Toasts received"
            value={toasts?.value}
            suffix={toasts?.suffix}
          />
          <StatBlock
            label="Comments received"
            value={comments?.value}
            suffix={comments?.suffix}
          />
          {friends && <StatBlock label="Unique friends" value={friends.value} />}
          <StatBlock
            label="Photos added"
            value={photos?.value}
            suffix={photos?.suffix}
          />
        </div>
      </div>
    </div>
  );
};

WrappdCardStats.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      suffix: PropTypes.string,
    })
  ).isRequired,
  dateRange: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }).isRequired,
};

export default WrappdCardStats;
