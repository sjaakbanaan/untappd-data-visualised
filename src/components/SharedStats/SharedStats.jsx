import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import SharedStatsLayout from './SharedStatsLayout';

const SharedStats = () => {
  // analytics
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: '/shared-stats',
      title: 'Shared Stats',
    });
  });

  const { id } = useParams();
  const [stats, setStats] = useState(null);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const docRef = doc(db, 'sharedStats', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setStats(data.stats);
          setDateRange({
            start: data.startDate,
            end: data.endDate,
          });
          setUserName(data.userName || 'Untappd Stats');
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
        <div className="text-xl text-yellow-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return <SharedStatsLayout userName={userName} dateRange={dateRange} stats={stats} />;
};

export default SharedStats;
