import PropTypes from 'prop-types';
import WrappdActiveFilters from './WrappdActiveFilters';
import WrappdShareButton from './WrappdShareButton';

const WrappdCardHero = ({
  userName,
  userAvatar,
  dateRange,
  filterOverview,
  filterYears = [],
  shareLinkTitle,
  totalBeers,
}) => {
  return (
    // min-h must match the StackCard shell so the absolutely-positioned
    // check-in number always sits at the card's bottom edge, regardless of
    // how much content the hero has
    <div className="relative flex min-h-[75vh] flex-col justify-between bg-gray-900 p-8 pb-[20vh] md:p-14 md:pb-[20vh]">
      {/* Decorative large number in background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 select-none overflow-hidden"
      >
        <span
          className="block font-extrabold leading-none text-gray-800"
          style={{ fontSize: 'clamp(12rem, 25vw, 14rem)', lineHeight: 0.85 }}
        >
          {totalBeers}
        </span>
      </div>

      {/* Top: logo wordmark + share */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo-wrappd.svg" className="w-10 opacity-60" alt="" />
          <span className="text-sm font-bold uppercase tracking-widest text-gray-500">
            Tappd Wrappd
          </span>
        </div>
        <WrappdShareButton userName={userName} />
      </div>

      {/* Centre: user info */}
      <div className="relative z-10 flex flex-1 flex-col justify-center py-12">
        <div className="mb-8 flex items-center gap-5 md:gap-7">
          {userAvatar && userAvatar.startsWith('data:image/jpeg;base64') && (
            <img
              crossOrigin="anonymous"
              className="size-16 shrink-0 rounded-full object-cover ring-4 ring-wrappdYellow ring-offset-4 ring-offset-gray-900 md:size-24"
              src={userAvatar}
              alt=""
            />
          )}
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            {userName}
          </h1>
        </div>
        {shareLinkTitle && (
          <p className="mb-2 text-2xl font-bold text-wrappdYellow md:text-3xl">
            {shareLinkTitle}
          </p>
        )}
        <WrappdActiveFilters
          filterOverview={filterOverview}
          dateRange={dateRange}
          filterYears={filterYears}
        />
      </div>

      {/* Bottom: scroll hint */}
      <div className="relative z-10 flex items-center justify-center">
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
  filterYears: PropTypes.arrayOf(PropTypes.number),
  shareLinkTitle: PropTypes.string,
  totalBeers: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default WrappdCardHero;
