import { useState } from 'react';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import Icon from './UI/Icon/Icon';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { userProfile, user } = useAuth();
  const location = useLocation();
  const userName = userProfile?.untappd_username;

  const isDashboard = location.pathname === '/' && user;
  const isHomeNotLoggedIn = location.pathname === '/' && !user;
  const isClickable = !isDashboard || isHomeNotLoggedIn;

  const headerTitle = 'Tappd';

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gray-900 p-4 md:p-4 xl:p-6">
      <div className="container relative mx-auto">
        <div className="md:mb-6">
          <div className="flex justify-between gap-2 md:gap-10">
            <div className="flex w-full flex-row items-center gap-3 overflow-hidden">
              {!isHomeNotLoggedIn && (
                <h1 className="mb-2 text-center text-3xl font-bold text-yellow-500 md:text-4xl">
                  {isClickable ? <Link to="/">{headerTitle}</Link> : headerTitle}
                </h1>
              )}
              {userName && (
                <h2 className="text-center text-xl font-bold text-gray-400 lg:text-2xl">
                  for {userName}
                </h2>
              )}
            </div>
            <div className="flex items-center md:mb-0">
              {/* Desktop navigation */}
              <div className="hidden md:block">
                <Navigation />
              </div>
              {userName && (
                <a
                  className="mr-3"
                  title={`Untappd profile of ${userName}`}
                  href={`https://untappd.com/user/${userName}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon
                    icon="UNTAPPD"
                    className="hidden w-5 fill-yellow-500 transition-transform hover:scale-110 md:block"
                  />
                </a>
              )}
              <a
                href="https://github.com/sjaakbanaan/untappd-data-visualised/"
                title="Github repository"
                target="_blank"
                rel="noreferrer"
              >
                <Icon
                  icon="GITHUB"
                  className="hidden w-5 fill-white transition-opacity hover:opacity-80 md:block"
                />
              </a>
              {/* Mobile hamburger button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="rounded-lg p-2 text-white transition-colors hover:bg-gray-800 md:hidden"
                aria-label="Open menu"
              >
                <Icon icon="HAMBURGER" className="w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </div>
  );
};
export default Header;
