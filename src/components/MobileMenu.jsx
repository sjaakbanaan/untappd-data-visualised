import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DataContext } from '../DataContext';
import Icon from './UI/Icon/Icon';

const MobileMenu = ({ isOpen, onClose }) => {
  const { beerData } = useContext(DataContext);
  const { userProfile, logout } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  const isProfileComplete = !!(userProfile?.untappd_username && userProfile?.venue_city);
  const hasData = beerData && beerData.length > 0;

  const handleNavClick = () => {
    onClose();
  };

  const linkClasses = (path) =>
    `block w-full rounded-lg px-4 py-3 text-lg font-medium transition-colors ${
      pathname === path
        ? 'bg-yellow-500/10 text-yellow-500'
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-gray-900 p-6 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } overflow-y-auto border-l border-gray-800`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Menu</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {!userProfile && (
            <Link to="/login" className={linkClasses('/login')} onClick={handleNavClick}>
              Login
            </Link>
          )}
          {userProfile && isProfileComplete && hasData && (
            <Link to="/" className={linkClasses('/')} onClick={handleNavClick}>
              Dashboard
            </Link>
          )}
          {userProfile && isProfileComplete && (
            <Link
              to="/upload"
              className={linkClasses('/upload')}
              onClick={handleNavClick}
            >
              Import
            </Link>
          )}
          <Link
            to="/leaderboard"
            className={linkClasses('/leaderboard')}
            onClick={handleNavClick}
          >
            Leaderboard
          </Link>
          {userProfile && (
            <Link
              to="/settings"
              className={linkClasses('/settings')}
              onClick={handleNavClick}
            >
              Settings
            </Link>
          )}

          {/* External links */}
          {userProfile?.untappd_username && (
            <>
              <hr className="my-3 border-gray-800" />
              <a
                href={`https://untappd.com/user/${userProfile.untappd_username}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
              >
                <Icon icon="UNTAPPD" className="w-5 fill-yellow-500" />
                Untappd Profile
              </a>
            </>
          )}
          <a
            href="https://github.com/sjaakbanaan/untappd-data-visualised/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <Icon icon="GITHUB" className="w-5 fill-white" />
            GitHub
          </a>

          {/* Logout */}
          {userProfile && (
            <>
              <hr className="my-3 border-gray-800" />
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full rounded-lg px-4 py-3 text-left text-lg font-medium text-red-400 transition-colors hover:bg-gray-800 hover:text-red-300"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
