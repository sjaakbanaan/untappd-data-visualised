import { useState, useEffect } from 'react';
import Navigation from './Navigation.jsx';
import Icon from './Icon/Icon.jsx';
import { getLocalStorageData } from '../utils/';

const Header = () => {
  const [storedUserName, setStoredUserName] = useState(null);

  useEffect(() => {
    // Check for userDetails in local storage
    setStoredUserName(getLocalStorageData('untappd_username'));
  }, []); // Run only on component mount

  return (
    <div className="bg-gray-900 p-4 md:p-4 xl:p-6">
      <div className="container relative mx-auto">
        <div className="mb-6">
          <div className="mb-6 flex items-center justify-end md:mb-0">
            <Navigation />
            {storedUserName && (
              <a
                className="mr-3"
                title={`Untappd profile of ${storedUserName}`}
                href={`https://untappd.com/user/${storedUserName}`}
                target="_blank"
              >
                <Icon icon="UNTAPPD" className="w-5 fill-yellow-500" />
              </a>
            )}
            <a
              href="https://github.com/sjaakbanaan/untappd-data-visualised/"
              title="Github repository"
              target="_blank"
            >
              <Icon icon="GITHUB" className="w-5 fill-white" />
            </a>
          </div>
          <h1 className="mb-2 text-center text-4xl font-bold text-yellow-500">
            Untappd Data Visualised
          </h1>
          {storedUserName && (
            <h2 className="text-center text-2xl font-bold text-gray-400">
              {storedUserName}
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
