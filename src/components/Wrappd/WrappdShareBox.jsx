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
    <div className="container mx-auto mb-8 mt-10 max-w-[700px] overflow-hidden border-gray-400 bg-yellow-500 p-6 text-gray-800 md:p-8">
      <img
        src="/mockup.png"
        alt="Tappd Wrappd"
        className="mx-auto mb-6 mt-4 w-full max-w-[200px] md:float-right md:-mb-20  md:ml-6 md:max-w-[300px]"
      />
      <h2 className="mb-4 text-2xl font-bold">Share your stats</h2>
      {shareLink ? (
        <>
          <p>Here it is, it's also copied to clipboard:</p>
          <p className="break-all text-gray-800 underline">
            <a href={shareLink} target="_blank" rel="noopener noreferrer">
              {shareLink}
            </a>
          </p>
        </>
      ) : (
        <>
          <p className="mb-4">
            Click on the button below to share your beer journey for{' '}
            <span className="font-bold">
              {formatWrappdDates(filterDateRange.start, filterDateRange.end)}
            </span>
            .
          </p>
          <p className="mb-2">
            Set a custom title for your Wrappd, it replaces the date range{' '}
            <em>(optional)</em>:
          </p>
          <input
            type="text"
            value={shareLinkTitle}
            className="mb-4 appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
            onChange={(e) => setShareLinkTitle(e.target.value)}
          />
          <div className="mt-4 flex">
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
              className="rounded border border-white bg-gray-800 px-4 py-2 text-white transition-colors duration-300 hover:bg-gray-700"
            >
              {isLoading ? 'Generating link...' : 'Create Tappd Wrappd'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

WrappdShareBox.propTypes = {
  filterDateRange: PropTypes.object.isRequired,
  filterOverview: PropTypes.object,
  filteredData: PropTypes.array,
};

export default WrappdShareBox;
