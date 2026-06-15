import { doc, setDoc, getDoc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { filterDuplicateBeers } from './filterDuplicateBeers';
import {
  buildComparisonStatsMonthDocs,
  COMPARISON_DATA_VERSION,
  deleteComparisonData,
  getDataCoverage,
} from './comparisonData';

export const writeComparisonMonthDocs = async (uid, monthDocs, oldMonthIds = []) => {
  const nextMonthIds = monthDocs.map((month) => month.id);
  const staleMonthIds = oldMonthIds.filter((monthId) => !nextMonthIds.includes(monthId));
  const writes = [
    ...monthDocs.map((month) => ({
      type: 'set',
      ref: doc(db, 'leaderboard', uid, 'comparisonMonths', month.id),
      data: {
        ...month,
        updatedAt: new Date().toISOString(),
      },
    })),
    ...staleMonthIds.map((monthId) => ({
      type: 'delete',
      ref: doc(db, 'leaderboard', uid, 'comparisonMonths', monthId),
    })),
  ];

  for (let i = 0; i < writes.length; i += 450) {
    const batch = writeBatch(db);

    writes.slice(i, i + 450).forEach((write) => {
      if (write.type === 'delete') {
        batch.delete(write.ref);
      } else {
        batch.set(write.ref, write.data);
      }
    });

    await batch.commit();
  }
};

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
    const leaderboardDoc = await getDoc(doc(db, 'leaderboard', user.uid));
    const oldMonthIds = leaderboardDoc.exists()
      ? leaderboardDoc.data().comparisonStatsMonths || []
      : [];
    const hideFromLeaderboard = userDoc.exists()
      ? !!userDoc.data().hide_from_leaderboard
      : false;
    const comparisonMonthDocs = hideFromLeaderboard
      ? []
      : buildComparisonStatsMonthDocs(beerData);
    const comparisonStatsMonths = comparisonMonthDocs.map((month) => month.id);
    const coverage = getDataCoverage(beerData);
    const comparisonStatsSize = comparisonMonthDocs.reduce(
      (size, month) => size + JSON.stringify(month.comparisonStatsCompact).length,
      0
    );

    if (hideFromLeaderboard) {
      try {
        await deleteComparisonData(user.uid);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Failed to delete legacy comparison data from Storage:', error);
      }
    }

    await writeComparisonMonthDocs(user.uid, comparisonMonthDocs, oldMonthIds);

    await setDoc(
      doc(db, 'leaderboard', user.uid),
      {
        untappd_username: username,
        totalCheckins,
        uniqueCheckins,
        hideFromLeaderboard,
        comparisonDataVersion: hideFromLeaderboard ? null : COMPARISON_DATA_VERSION,
        comparisonStoragePath: null,
        comparisonStatsCompact: null,
        comparisonStatsStatus: hideFromLeaderboard ? 'hidden' : 'ready',
        comparisonStatsMonths,
        comparisonStatsMonthCount: comparisonStatsMonths.length,
        comparisonStatsDayCount: comparisonMonthDocs.reduce(
          (count, month) =>
            count + Object.keys(month.comparisonStatsCompact.days || {}).length,
          0
        ),
        comparisonStatsSize,
        comparisonStatsUpdatedAt: new Date().toISOString(),
        comparisonStatsDays: [],
        firstCheckinDate: coverage.firstCheckinDate,
        lastCheckinDate: coverage.lastCheckinDate,
        lastUpdated: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to update leaderboard:', error);
    throw error;
  }
};
