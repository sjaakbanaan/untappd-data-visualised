import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DataContext } from '../DataContext';

const Navigation = () => {
  const { beerData } = useContext(DataContext);
  const { userProfile, logout } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  const isProfileComplete = !!(userProfile?.untappd_username && userProfile?.venue_city);
  const hasData = beerData && beerData.length > 0;

  return (
    <nav className="mr-3">
      <ul className="flex items-center gap-4 text-sm">
        {!userProfile && (
          <li>
            <Link to="/login" className="text-white">
              Login
            </Link>
          </li>
        )}
        {userProfile && isProfileComplete && hasData && (
          <li>
            <Link
              to="/"
              className={`transition-colors hover:text-yellow-500 ${pathname === '/' ? 'text-yellow-500' : 'text-white'}`}
            >
              Dashboard
            </Link>
          </li>
        )}
        {userProfile && isProfileComplete && (
          <li>
            <Link
              to="/upload"
              className={`transition-colors hover:text-yellow-500 ${pathname === '/upload' ? 'text-yellow-500' : 'text-white'}`}
            >
              Import
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/leaderboard"
            className={`transition-colors hover:text-yellow-500 ${pathname === '/leaderboard' ? 'text-yellow-500' : 'text-white'}`}
          >
            Leaderboard
          </Link>
        </li>
        {userProfile && (
          <li>
            <Link
              to="/settings"
              className={`transition-colors hover:text-yellow-500 ${pathname === '/settings' ? 'text-yellow-500' : 'text-white'}`}
            >
              Settings
            </Link>
          </li>
        )}
        {userProfile && (
          <li>
            <button
              onClick={logout}
              className="text-gray-400 transition-colors hover:text-red-500"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
