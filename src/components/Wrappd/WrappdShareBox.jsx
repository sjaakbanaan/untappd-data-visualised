import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useShareStats, formatWrappdDates, useBasicStats } from '../../utils';

const WrappdShareBox = ({ filterDateRange, filterOverview, filteredData }) => {
  const { shareLink, setShareLink, isLoading, handleShare } = useShareStats();
  const { stats, topLists } = useBasicStats(filteredData, filterDateRange);
  const [shareLinkTitle, setShareLinkTitle] = useState('');

  // reset share link when beerData changes
  useEffect(() => {
    setShareLink('');
  }, [filteredData, setShareLink]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-yellow-500 p-6 text-gray-900 shadow-inner md:p-8">
      <div className="relative z-10 flex items-center">
        <div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight">
            Generate Your Wrappd
          </h2>

          {shareLink ? (
            <div className="space-y-4">
              <div className="rounded-lg bg-gray-900/10 p-4 backdrop-blur-sm">
                <p className="font-semibold">Your Wrappd is ready!</p>
                <p className="mt-1 text-sm">
                  The link has been copied to your clipboard:
                </p>
                <div className="mt-3 break-all font-mono text-sm font-bold underline">
                  <a
                    href={shareLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black"
                  >
                    {shareLink}
                  </a>
                </div>
              </div>
              <button
                onClick={() => setShareLink('')}
                className="text-sm font-bold underline hover:no-underline"
              >
                Create another one
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                Create a stunning visual summary of your beer journey for{' '}
                <span className="font-black">
                  {formatWrappdDates(filterDateRange.start, filterDateRange.end)}
                </span>
                .
              </p>

              <div className="space-y-2">
                <label
                  htmlFor="wrappd-title"
                  className="block text-sm font-bold uppercase tracking-wider text-gray-800"
                >
                  Custom Title (Optional)
                </label>
                <input
                  id="wrappd-title"
                  type="text"
                  placeholder="e.g. My Craft Beer Year"
                  value={shareLinkTitle}
                  className="w-full max-w-md rounded-lg border-2 border-black/10 bg-white/50 px-4 py-3 font-medium placeholder:text-gray-500 focus:border-black/20 focus:bg-white focus:outline-none"
                  onChange={(e) => setShareLinkTitle(e.target.value)}
                />
                <p className="text-xs text-gray-700">
                  This replaces the date range in your Wrappd.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={() =>
                    handleShare(
                      stats,
                      filterDateRange,
                      topLists,
                      filterOverview,
                      shareLinkTitle
                    )
                  }
                  disabled={isLoading}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gray-900 px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:bg-black active:scale-95 disabled:opacity-70"
                >
                  {isLoading && (
                    <div className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  )}
                  <span>
                    {isLoading ? 'Brewing your Link...' : 'Create Tappd Wrappd'}
                  </span>
                  {!isLoading && (
                    <svg
                      className="size-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
        <img
          src="/mockup.png"
          alt="Tappd Wrappd"
          className="mx-auto mb-6 w-full max-w-[180px] drop-shadow-2xl md:-mb-16 md:ml-6 md:max-w-[280px]"
        />
      </div>
    </div>
  );
};

WrappdShareBox.propTypes = {
  filterDateRange: PropTypes.object.isRequired,
  filterOverview: PropTypes.object,
  filteredData: PropTypes.array,
};

export default WrappdShareBox;
