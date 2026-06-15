import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { filterDuplicateBeers } from './filterDuplicateBeers';
import {
  buildComparisonStatsDays,
  COMPARISON_DATA_VERSION,
  deleteComparisonData,
  getDataCoverage,
  getComparisonStoragePath,
  uploadComparisonData,
} from './comparisonData';

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
    const comparisonStatsDays = hideFromLeaderboard
      ? []
      : buildComparisonStatsDays(beerData);
    const coverage = getDataCoverage(beerData);
    let comparisonDataVersion = hideFromLeaderboard ? null : COMPARISON_DATA_VERSION;
    let comparisonStoragePath = null;

    if (hideFromLeaderboard) {
      await deleteComparisonData(user.uid);
    } else {
      try {
        await uploadComparisonData(user, beerData);
        comparisonStoragePath = getComparisonStoragePath(user.uid);
      } catch (error) {
        comparisonDataVersion = COMPARISON_DATA_VERSION;
        // eslint-disable-next-line no-console
        console.warn('Failed to upload comparison data to Storage:', error);
      }
    }

    await setDoc(
      doc(db, 'leaderboard', user.uid),
      {
        untappd_username: username,
        totalCheckins,
        uniqueCheckins,
        hideFromLeaderboard,
        comparisonDataVersion,
        comparisonStoragePath,
        comparisonStatsDays,
        firstCheckinDate: coverage.firstCheckinDate,
        lastCheckinDate: coverage.lastCheckinDate,
        lastUpdated: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to update leaderboard:', error);
  }
};
