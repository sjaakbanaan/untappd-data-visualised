import { useEffect, useState } from 'react';
import ReactGA from 'react-ga4';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import StatCard from '../StatCard/StatCard';
import { formatWrappdDates } from '../../utils';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const docRef = doc(db, 'sharedStats', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setStats(data.stats);
          setUserName(data.userName);
          setDateRange({
            start: data.startDate,
            end: data.endDate,
          });
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

  return (
    <div className="container max-w-[1024px] mx-auto p-4 md:p-0 my-8">
      <h1 className="mb-4 text-center text-4xl font-bold text-yellow-500">{userName}</h1>
      {dateRange.start && dateRange.end && (
        <h2 className="mb-12 text-center text-2xl font-bold text-white">
          {formatWrappdDates(dateRange.start, dateRange.end)}
        </h2>
      )}
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {stats.map((item, i) => (
          <StatCard key={i} statKey={item.key} value={item.value} suffix={item.suffix} />
        ))}
      </ul>
      <div className="my-5 p-3 text-center text-yellow-500 md:my-10">
        Created your own on{' '}
        <a href="https://tapped.online" target="_blank">
          tapped.online
        </a>
        <div className="pt-1 text-gray-400">powered by Untappd</div>
      </div>
    </div>
  );
};

export default SharedStats;
