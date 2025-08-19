/* eslint-disable no-console */
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocalStorageData, convertImageToBase64 } from '.';

export const useShareStats = () => {
  const [shareLink, setShareLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userName = useLocalStorageData('untappd_username');
  const userAvatar = useLocalStorageData('untappd_avatar');

  const handleShare = async (
    stats,
    filterDateRange,
    topLists,
    filterOverview,
    shareLinkTitle
  ) => {
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

          if (item.photo_url) cleanItem.photo_url = item.photo_url;
          if (item.bid) cleanItem.bid = item.bid;
          if (item.url) cleanItem.url = item.url;
          if (item.your_score !== undefined) cleanItem.your_score = item.your_score;

          return cleanItem;
        }),
      }));

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
        filterOverview: filterOverview,
        shareLinkTitle: shareLinkTitle || '',
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

  return {
    shareLink,
    setShareLink,
    isLoading,
    handleShare,
  };
};
