import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { filterDuplicateBeers } from './filterDuplicateBeers';

/**
 * Compute leaderboard stats from processed beerData and write
 * them to the `leaderboard/{uid}` Firestore document.
 */
export const updateLeaderboard = async (user, username, beerData) => {
  // username is REQUIRED to avoid leaking PII (emails) to the public leaderboard
  if (!user?.uid || !username || !Array.isArray(beerData) || beerData.length === 0) {
    return;
  }

  try {
    const totalCheckins = beerData.length;

    // Use filterDuplicateBeers directly so the count is always
    // identical to what TopTable shows in the dashboard.
    const uniqueCheckins = filterDuplicateBeers(beerData).length;

    // Check if user has opted out of the leaderboard
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const hideFromLeaderboard = userDoc.exists()
      ? !!userDoc.data().hide_from_leaderboard
      : false;

    await setDoc(
      doc(db, 'leaderboard', user.uid),
      {
        untappd_username: username,
        totalCheckins,
        uniqueCheckins,
        hideFromLeaderboard,
        lastUpdated: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to update leaderboard:', error);
  }
};
