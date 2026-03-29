import Navigation from './Navigation';
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

  const headerTitle = 'Untappd Data Visualised';

  return (
    <div className="bg-gray-900 p-4 md:p-4 xl:p-6">
      <div className="container relative mx-auto">
        <div className="mb-6">
          <div className="mb-6 flex items-center justify-end md:mb-0">
            <Navigation />
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
                  className="w-5 fill-yellow-500 transition-transform hover:scale-110"
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
                className="w-5 fill-white transition-opacity hover:opacity-80"
              />
            </a>
          </div>
          {!isHomeNotLoggedIn && (
            <h1 className="mb-2 text-center text-3xl font-bold text-yellow-500 md:text-4xl">
              {isClickable ? <Link to="/">{headerTitle}</Link> : headerTitle}
            </h1>
          )}
          {userName && (
            <h2 className="text-center text-2xl font-bold text-gray-400">{userName}</h2>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
