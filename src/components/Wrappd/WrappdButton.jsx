import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useShareStats, formatWrappdDates } from '../../utils/';

const WrappdButton = ({ stats, filterDateRange, topLists, filterOverview, beerData }) => {
  const { shareLink, setShareLink, isLoading, handleShare } = useShareStats();

  // reset share link when beerData changes
  useEffect(() => {
    setShareLink('');
  }, [beerData, setShareLink]);

  return (
    <div className="mb-8 border-2 border-dashed border-gray-400 p-6 md:p-8">
      <h2 className="text-2xl font-bold">Share your stats</h2>
      <p className="mt-2 text-gray-400">
        Click on the button below to share your beer journey for{' '}
        <span className="text-white">
          {formatWrappdDates(filterDateRange.start, filterDateRange.end)}
        </span>
        .
      </p>
      {shareLink ? (
        <div className="my-4 rounded bg-gray-800 p-4">
          <p className="text-sm text-white">
            Here it is, the link has also been copied to your clipboard:
          </p>
          <p className="break-all text-yellow-500">
            <a href={shareLink} target="_blank" rel="noopener noreferrer">
              {shareLink}
            </a>
          </p>
        </div>
      ) : (
        <div className="mt-4 flex">
          <button
            onClick={() => handleShare(stats, filterDateRange, topLists, filterOverview)}
            disabled={isLoading}
            className="rounded bg-yellow-500 px-4 py-2 text-black transition-colors duration-300 hover:bg-yellow-400"
          >
            {isLoading ? 'Generating link...' : 'Create Tappd Wrappd'}
          </button>
        </div>
      )}
    </div>
  );
};

WrappdButton.propTypes = {
  stats: PropTypes.array.isRequired,
  filterDateRange: PropTypes.object.isRequired,
  topLists: PropTypes.array.isRequired,
  filterOverview: PropTypes.object,
  beerData: PropTypes.array,
};

export default WrappdButton;
