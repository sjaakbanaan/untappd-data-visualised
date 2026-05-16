import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { useShareStats, formatWrappdDates, useBasicStats } from '../../utils';

const sortByCreatedAtDesc = (a, b) => {
  return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
};

const WrappdShareBox = ({
  filterDateRange,
  filterOverview,
  filteredData,
  lookupRefreshKey = 0,
  onShareCreated,
}) => {
  const { shareLink, setShareLink, isLoading, handleShare } = useShareStats();
  const { user, userProfile } = useAuth();
  const { stats, topLists } = useBasicStats(filteredData, filterDateRange);
  const [shareLinkTitle, setShareLinkTitle] = useState('');
  const [existingWrappd, setExistingWrappd] = useState(null);
  const [isCheckingExistingWrappd, setIsCheckingExistingWrappd] = useState(true);

  const untappdUsername = userProfile?.untappd_username;

  // reset share link when beerData changes
  useEffect(() => {
    setShareLink('');
  }, [filteredData, setShareLink]);

  useEffect(() => {
    const fetchExistingWrappd = async () => {
      if (!filterDateRange?.start || !filterDateRange?.end) {
        setExistingWrappd(null);
        setIsCheckingExistingWrappd(false);
        return;
      }

      setIsCheckingExistingWrappd(true);

      try {
        const wrappdStatsRef = collection(db, 'wrappdStats');
        const requests = [];

        if (user?.uid) {
          requests.push(getDocs(query(wrappdStatsRef, where('userId', '==', user.uid))));
        }

        if (untappdUsername) {
          requests.push(
            getDocs(query(wrappdStatsRef, where('userName', '==', untappdUsername)))
          );
        }

        const snapshots = await Promise.all(requests);
        const wrappdMap = new Map();

        snapshots.forEach((snapshot) => {
          snapshot.forEach((docSnap) => {
            const wrappd = docSnap.data();

            if (
              wrappd.startDate === filterDateRange.start &&
              wrappd.endDate === filterDateRange.end
            ) {
              wrappdMap.set(docSnap.id, {
                id: docSnap.id,
                ...wrappd,
              });
            }
          });
        });

        setExistingWrappd(
          Array.from(wrappdMap.values()).sort(sortByCreatedAtDesc)[0] || null
        );
      } catch {
        setExistingWrappd(null);
      } finally {
        setIsCheckingExistingWrappd(false);
      }
    };

    fetchExistingWrappd();
  }, [
    filterDateRange?.end,
    filterDateRange?.start,
    lookupRefreshKey,
    untappdUsername,
    user?.uid,
  ]);

  return (
    <div className="relative overflow-hidden rounded-xl bg-yellow-500 p-6 text-gray-900 shadow-inner md:p-8">
      <div className="relative z-10 flex items-center">
        <div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight">
            {!existingWrappd ? 'Generate Your Wrappd' : 'Watch Your Wrappd'}
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
                {!existingWrappd
                  ? 'Create a stunning visual summary of your beer journey for '
                  : 'You already have a Wrappd for this date range.'}
                <span className="font-black">
                  {formatWrappdDates(filterDateRange.start, filterDateRange.end)}
                </span>
                .
              </p>

              {!existingWrappd && (
                <div className="space-y-2 pb-4">
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
              )}

              <div>
                <button
                  onClick={async () => {
                    if (existingWrappd) {
                      window.open(
                        `/wrappd/${existingWrappd.id}`,
                        '_blank',
                        'noopener,noreferrer'
                      );
                      return;
                    }

                    const venueLocations = (filteredData || []).filter(
                      (item, index, self) =>
                        item.venue_lat &&
                        item.venue_lng &&
                        index ===
                          self.findIndex(
                            (t) =>
                              t.venue_lat === item.venue_lat &&
                              t.venue_lng === item.venue_lng
                          )
                    );
                    const shareUrl = await handleShare(
                      stats,
                      filterDateRange,
                      topLists,
                      filterOverview,
                      shareLinkTitle,
                      venueLocations
                    );

                    if (shareUrl) {
                      setExistingWrappd({
                        id: shareUrl.split('/').pop(),
                        createdAt: new Date().toISOString(),
                        startDate: filterDateRange.start,
                        endDate: filterDateRange.end,
                      });
                      onShareCreated?.();
                    }
                  }}
                  disabled={isLoading || isCheckingExistingWrappd}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-gray-900 px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:bg-black active:scale-95 disabled:opacity-70"
                >
                  {(isLoading || isCheckingExistingWrappd) && (
                    <div className="size-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  )}
                  <span>
                    {isCheckingExistingWrappd
                      ? 'Checking...'
                      : isLoading
                        ? 'Brewing your Link...'
                        : existingWrappd
                          ? 'Tappd Wrappd'
                          : 'Create Tappd Wrappd'}
                  </span>
                  {!isLoading && !isCheckingExistingWrappd && (
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
  lookupRefreshKey: PropTypes.number,
  onShareCreated: PropTypes.func,
};

export default WrappdShareBox;
