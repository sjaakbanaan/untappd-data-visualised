import { useState } from 'react';
import PropTypes from 'prop-types';
import { getOverviewStats } from '../../utils';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import StatCard from '../StatCard/StatCard';
import { useLocalStorageData } from '../../utils';

const BasicStats = ({ beerData, fullBeerData, filterDateRange }) => {
  const [shareLink, setShareLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // get userName from local storage
  const userName = useLocalStorageData('untappd_username');

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
        userName: userName,
        stats: validStats,
        startDate: filterDateRange.start,
        endDate: filterDateRange.end,
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
                <StatCard
                  key={i}
                  statKey={item.key}
                  value={item.value}
                  suffix={item.suffix}
                />
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
