import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const SharedStats = () => {
  const { id } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const docRef = doc(db, 'sharedStats', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStats(docSnap.data().stats);
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-yellow-500">
        Shared Stats
      </h1>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((item, i) => (
          <li
            key={i}
            className="block overflow-hidden bg-gray-800 px-4 py-8 shadow-lg transition-transform duration-300 hover:scale-110 md:rounded-lg"
          >
            <div className="grid h-full grid-rows-auto-1fr text-center text-xl">
              <div className="font-bold">{item.key}</div>
              <div className="mb-4 mt-6 flex items-center justify-center whitespace-nowrap">
                <div className="min-h-[40px] text-[60px] font-extrabold text-yellow-500">
                  {item.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                </div>
              </div>
              <div className="-mt-2 flex justify-center text-sm text-gray-500">
                <span>{item.suffix}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SharedStats;
