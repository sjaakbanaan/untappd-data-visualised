/* eslint-disable no-console */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { useLocalStorageData, convertImageToBase64 } from '../../utils';

const WrappdButton = ({ stats, filterDateRange, topLists }) => {
  const [shareLink, setShareLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // get user details from local storage
  const userName = useLocalStorageData('untappd_username');
  const userAvatar = useLocalStorageData('untappd_avatar');

  const handleShare = async () => {
    setIsLoading(true);
    try {
      const validStats = stats
        .filter((item) => !item.hide && item.value !== undefined && item.value !== null)
        .map((item) => ({
          key: item.key,
          short_key: item.short_key || item.key,
          value: item.value,
          suffix: item.suffix || '',
        }));

      const validTopLists = topLists.map((list) => ({
        title: list.title,
        valueKey: list.valueKey || 'value',
        suffix: list.suffix || '',
        items: list.items.map((item) => {
          const cleanItem = {
            name: item.name,
            [list.valueKey || 'value']: item.value || item.count || 0,
          };

          // Only add these properties if they exist
          if (item.photo_url) cleanItem.photo_url = item.photo_url;
          if (item.bid) cleanItem.bid = item.bid;
          if (item.url) cleanItem.url = item.url;
          if (item.your_score !== undefined) cleanItem.your_score = item.your_score;

          return cleanItem;
        }),
      }));

      // Convert avatar to base64 if it exists
      const processedUserAvatar = userAvatar
        ? await convertImageToBase64(userAvatar)
        : null;

      const statsData = {
        userName: userName,
        userAvatar: processedUserAvatar,
        topLists: validTopLists,
        stats: validStats,
        startDate: filterDateRange.start,
        endDate: filterDateRange.end,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'wrappdStats'), statsData);
      const shareUrl = `${window.location.origin}/wrappd/${docRef.id}`;
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
          {isLoading ? 'Creating link...' : 'Tappd Wrappd'}
        </button>
      </div>
      {shareLink && (
        <div className="mb-4 rounded bg-gray-800 p-4">
          <p className="text-sm text-gray-400">Your personal link for this range:</p>
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
};

export default WrappdButton;
