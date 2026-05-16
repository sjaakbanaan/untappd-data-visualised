/* eslint-disable no-console */
import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc as firestoreDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { formatWrappdDates } from '../../utils';
import Icon from '../UI/Icon/Icon';

const sortByCreatedAtDesc = (a, b) => {
  return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
};

const getWrappdDateRange = (wrappd) => {
  if (wrappd.startDate && wrappd.endDate) {
    return formatWrappdDates(wrappd.startDate, wrappd.endDate);
  }

  return '';
};

const getWrappdTitle = (wrappd) => {
  const customTitle = wrappd.shareLinkTitle?.trim();

  if (customTitle) {
    return customTitle;
  }

  return getWrappdDateRange(wrappd) || 'Untitled Wrappd';
};

const openWrappd = (id) => {
  window.open(`/wrappd/${id}`, '_blank', 'noopener,noreferrer');
};

const WrappdBacklog = ({ refreshKey = 0, onWrappdDeleted }) => {
  const { user, userProfile } = useAuth();
  const [wrappds, setWrappds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState('');

  const untappdUsername = userProfile?.untappd_username;

  useEffect(() => {
    const fetchWrappds = async () => {
      if (!user && !untappdUsername) {
        setWrappds([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const wrappdStatsRef = collection(db, 'wrappdStats');
        const requests = [];

        if (user?.uid) {
          requests.push(getDocs(query(wrappdStatsRef, where('userId', '==', user.uid))));
        }

        if (untappdUsername) {
          requests.push(
            getDocs(query(wrappdStatsRef, where('userName', '==', untappdUsername)))
          );
        }

        const snapshots = await Promise.all(requests);
        const wrappdMap = new Map();

        snapshots.forEach((snapshot) => {
          snapshot.forEach((docSnap) => {
            wrappdMap.set(docSnap.id, {
              id: docSnap.id,
              ...docSnap.data(),
            });
          });
        });

        setWrappds(Array.from(wrappdMap.values()).sort(sortByCreatedAtDesc));
      } catch (err) {
        console.error('Failed to load Wrappd backlog:', err);
        setError('Could not load your previous Wrappds.');
      } finally {
        setLoading(false);
      }
    };

    fetchWrappds();
  }, [refreshKey, user, untappdUsername]);

  const rows = useMemo(() => {
    return wrappds.map((wrappd) => ({
      ...wrappd,
      dateRange: getWrappdDateRange(wrappd),
      hasCustomTitle: !!wrappd.shareLinkTitle?.trim(),
      title: getWrappdTitle(wrappd),
    }));
  }, [wrappds]);

  const handleDelete = async (wrappd) => {
    const confirmed = window.confirm(`Delete "${wrappd.title}"?`);

    if (!confirmed) return;

    setDeletingId(wrappd.id);
    setError('');

    try {
      await deleteDoc(firestoreDoc(db, 'wrappdStats', wrappd.id));
      setWrappds((currentWrappds) =>
        currentWrappds.filter((currentWrappd) => currentWrappd.id !== wrappd.id)
      );
      onWrappdDeleted?.();
    } catch (err) {
      console.error('Failed to delete Wrappd:', err);
      setError('Could not delete this Wrappd.');
    } finally {
      setDeletingId('');
    }
  };

  const handleRowKeyDown = (event, wrappd) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openWrappd(wrappd.id);
    }
  };

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-gray-700 bg-gray-900/40">
      <div className="border-b border-gray-700 px-4 py-3 md:px-5">
        <h3 className="text-lg font-bold text-yellow-500">Your Wrappd History</h3>
      </div>

      {loading && (
        <div className="px-4 py-6 text-sm text-gray-400 md:px-5">
          Loading your previous Wrappds...
        </div>
      )}

      {!loading && error && (
        <div className="px-4 py-6 text-sm text-red-400 md:px-5">{error}</div>
      )}

      {!loading && !error && rows.length === 0 && (
        <div className="px-4 py-6 text-sm text-gray-400 md:px-5">
          No Wrappds created yet.
        </div>
      )}

      {!loading && !error && rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-950/50 text-xs uppercase tracking-wider text-gray-400">
              <tr>
                <th className="px-4 py-3 font-bold md:px-5">Title</th>
                <th className="px-4 py-3 text-right font-bold md:px-5">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {rows.map((wrappd) => (
                <tr
                  key={wrappd.id}
                  role="link"
                  tabIndex={0}
                  onClick={() => openWrappd(wrappd.id)}
                  onKeyDown={(event) => handleRowKeyDown(event, wrappd)}
                  className="group cursor-pointer transition-colors hover:bg-gray-800/70 focus:bg-gray-800/70 focus:outline-none"
                >
                  <td className="px-4 py-3 font-medium text-white md:px-5">
                    <span>{wrappd.title}</span>
                    {wrappd.hasCustomTitle && wrappd.dateRange && (
                      <span className="ml-2 text-xs font-normal text-gray-400">
                        {wrappd.dateRange}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right md:px-5">
                    <div className="inline-flex items-center justify-end gap-2">
                      <span className="font-bold text-yellow-500 underline-offset-4 group-hover:text-yellow-400">
                        View
                      </span>
                      <button
                        type="button"
                        title={`Delete ${wrappd.title}`}
                        aria-label={`Delete ${wrappd.title}`}
                        disabled={deletingId === wrappd.id}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDelete(wrappd);
                        }}
                        className="inline-flex size-8 items-center justify-center rounded text-gray-500 transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Icon icon="TRASH" className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WrappdBacklog;
