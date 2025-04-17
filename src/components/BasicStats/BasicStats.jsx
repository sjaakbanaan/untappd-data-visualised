import { useState } from 'react';
import PropTypes from 'prop-types';
import { getOverviewStats } from '../../utils';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

const BasicStats = ({ beerData, fullBeerData, filterDateRange }) => {
  const [shareLink, setShareLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const infoToShow = [
    'Total beers',
    'Unique beers',
    'Total breweries',
    'Beer styles',
    'Photos added',
    'Toasts received',
    'Comments received',
    'Venues drank at',
    'Venues purchased',
    'Cities drank in',
    'Countries drank in',
    'Brewery countries',
    'Unique friends',
    'Years active',
    'Days active',
    'Average rating',
  ];

  const stats = getOverviewStats(beerData, filterDateRange, fullBeerData, infoToShow);

  const handleShare = async () => {
    setIsLoading(true);
    try {
      const validStats = stats
        .filter((item) => !item.hide && item.value !== undefined && item.value !== null)
        .map((item) => ({
          key: item.key,
          value: item.value,
          suffix: item.suffix || '',
        }));

      const statsData = {
        stats: validStats,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'sharedStats'), statsData);
      const shareUrl = `${window.location.origin}/shared/${docRef.id}`;
      setShareLink(shareUrl);

      await navigator.clipboard.writeText(shareUrl);
      console.log('Link copied to clipboard!');
    } catch (error) {
      console.error('Failed to create share link:', error);
      alert(`Failed to create share link: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          onClick={handleShare}
          disabled={isLoading}
          className="rounded bg-yellow-500 px-4 py-2 text-black hover:bg-yellow-600 disabled:opacity-50"
        >
          {isLoading ? 'Creating link...' : 'Share Stats'}
        </button>
      </div>
      {shareLink && (
        <div className="mb-4 rounded bg-gray-800 p-4">
          <p className="text-sm text-gray-400">Share this link:</p>
          <p className="break-all text-yellow-500">{shareLink}</p>
        </div>
      )}
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.length > 0 &&
          stats.map(
            (item, i) =>
              !item.hide && (
                <li
                  key={i}
                  className="block overflow-hidden bg-gray-800 px-4 py-8 shadow-lg transition-transform duration-300 hover:scale-110 md:rounded-lg"
                >
                  <div className="grid h-full grid-rows-auto-1fr text-center text-xl">
                    <div className="font-bold">{item.key}</div>
                    <div className="mb-4 mt-6 flex items-center justify-center whitespace-nowrap">
                      <div className=" min-h-[40px] text-[60px] font-extrabold text-yellow-500">
                        {item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </div>
                    </div>
                    <div className="-mt-2 flex justify-center text-sm text-gray-500">
                      <span>{item.suffix}</span>
                    </div>
                  </div>
                </li>
              )
          )}
      </ul>
    </div>
  );
};

BasicStats.propTypes = {
  beerData: PropTypes.array.isRequired,
  fullBeerData: PropTypes.array.isRequired,
  filterDateRange: PropTypes.object.isRequired,
};

export default BasicStats;
