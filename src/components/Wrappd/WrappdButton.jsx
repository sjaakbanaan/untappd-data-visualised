import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useShareStats } from '../../utils/';

const WrappdButton = ({ stats, filterDateRange, topLists, filterOverview, beerData }) => {
  const { shareLink, setShareLink, isLoading, handleShare } = useShareStats();

  // reset share link when beerData changes
  useEffect(() => {
    setShareLink('');
  }, [beerData, setShareLink]);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => handleShare(stats, filterDateRange, topLists, filterOverview)}
          disabled={isLoading}
          className="rounded bg-yellow-500 px-4 py-2 text-black hover:bg-yellow-600 disabled:opacity-50"
        >
          {isLoading ? 'Creating link...' : 'Tappd Wrappd'}
        </button>
      </div>
      {shareLink && (
        <div className="mb-4 rounded bg-gray-800 p-4">
          <p className="text-sm text-white">Your personal link for this range:</p>
          <p className="break-all text-yellow-500">
            <a href={shareLink} target="_blank" rel="noopener noreferrer">
              {shareLink}
            </a>
          </p>
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
