import PropTypes from 'prop-types';
import { formatWrappdDates } from '../../utils/';
import ActiveFiltersDisplay from './ActiveFiltersDisplay';
import WrappdShareButton from './WrappdShareButton';

const WrappdCardHero = ({
  userName,
  userAvatar,
  dateRange,
  filterOverview,
  shareLinkTitle,
  totalBeers,
}) => {
  return (
    <div className="relative flex flex-col justify-between bg-gray-900 p-8 pb-[20vh] md:p-14 md:pb-[20vh]">
      {/* Decorative large number in background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 select-none overflow-hidden"
      >
        <span
          className="block font-extrabold leading-none text-gray-800"
          style={{ fontSize: 'clamp(12rem, 25vw, 20rem)', lineHeight: 0.85 }}
        >
          {totalBeers}
        </span>
      </div>

      {/* Top: logo wordmark */}
      <div className="relative z-10 flex items-center gap-3">
        <img src="/logo-wrappd.svg" className="w-10 opacity-60" alt="" />
        <span className="text-sm font-bold uppercase tracking-widest text-gray-500">
          Tappd Wrappd
        </span>
      </div>

      {/* Centre: user info */}
      <div className="relative z-10 flex flex-1 flex-col justify-center py-12">
        {userAvatar && userAvatar.startsWith('data:image/jpeg;base64') && (
          <img
            crossOrigin="anonymous"
            className="mb-6 w-20 rounded-full ring-4 ring-wrappdYellow ring-offset-4 ring-offset-gray-900 md:w-28"
            src={userAvatar}
            alt=""
          />
        )}
        <h1 className="mb-2 text-4xl font-extrabold leading-none md:text-6xl">
          {userName}
        </h1>
        {shareLinkTitle && (
          <p className="mb-1 text-2xl font-bold text-wrappdYellow md:text-3xl">
            {shareLinkTitle}
          </p>
        )}
        <p className="text-xl text-gray-400 md:text-2xl">
          {formatWrappdDates(dateRange.start, dateRange.end)}
        </p>
        <div className="mt-2 text-sm text-gray-500">
          <ActiveFiltersDisplay filterOverview={filterOverview} />
        </div>
      </div>

      {/* Bottom: share + scroll hint */}
      <div className="relative z-10 flex items-center justify-between">
        <WrappdShareButton userName={userName} />
        <div className="flex flex-col items-center gap-1 text-gray-600">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg
            className="animate-bounce"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

WrappdCardHero.propTypes = {
  userName: PropTypes.string.isRequired,
  userAvatar: PropTypes.string,
  dateRange: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }).isRequired,
  filterOverview: PropTypes.object.isRequired,
  shareLinkTitle: PropTypes.string,
  totalBeers: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default WrappdCardHero;
