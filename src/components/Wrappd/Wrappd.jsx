/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import WrappdLayout from './WrappdLayout';

const Wrappd = () => {
  // analytics
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/wrappd',
      title: 'wrappd',
    });
  });

  const { id } = useParams();
  const [stats, setStats] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [userName, setUserName] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [topLists, setTopLists] = useState(null);
  const [filterOverview, setFilterOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const docRef = doc(db, 'wrappdStats', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setStats(data.stats);
          setDateRange({
            start: data.startDate,
            end: data.endDate,
          });
          setUserName(data.userName || 'Untappd Stats');
          setUserAvatar(data.userAvatar || undefined);
          setTopLists(data.topLists || []);
          setFilterOverview(data.filterOverview || {});
        } else {
          setError('Stats not found');
        }
      } catch (err) {
        setError('Failed to load stats');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-bold text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-bold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <WrappdLayout
      userName={userName}
      userAvatar={userAvatar}
      dateRange={dateRange}
      stats={stats}
      topLists={topLists}
      filterOverview={filterOverview}
    />
  );
};

export default Wrappd;
