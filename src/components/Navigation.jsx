import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DataContext } from '../DataContext';
import Icon from './UI/Icon/Icon';

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
        {userProfile && isProfileComplete && (
          <li>
            <Link
              to="/my-wrappd"
              className={`transition-colors hover:text-yellow-500 ${pathname === '/my-wrappd' ? 'text-yellow-500' : 'text-white'}`}
            >
              Wrappd
            </Link>
          </li>
        )}
        {userProfile && isProfileComplete && (
          <li>
            <Link
              to="/leaderboard"
              className={`transition-colors hover:text-yellow-500 ${pathname === '/leaderboard' ? 'text-yellow-500' : 'text-white'}`}
            >
              Leaderboard
            </Link>
          </li>
        )}
        {userProfile && (
          <li>
            <Link
              to="/settings"
              title="Settings"
              aria-label="Settings"
              className={`transition-colors hover:text-yellow-500 ${pathname === '/settings' ? 'text-yellow-500' : 'text-white'}`}
            >
              <Icon icon="SETTINGS" className="w-5" />
            </Link>
          </li>
        )}
        {userProfile && (
          <li>
            <button
              onClick={logout}
              title="Logout"
              aria-label="Logout"
              className="flex items-center justify-center text-white transition-colors hover:text-red-500"
            >
              <Icon icon="LOGOUT" className="size-5" />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
