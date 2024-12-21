import Navigation from './Navigation.jsx';
import Icon from './Icon/Icon.jsx';
import { getUserName } from '../utils';

const Header = () => {
  const userName = getUserName();

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
          {userName && (
            <h2 className="text-center text-2xl font-bold text-gray-400">{userName}</h2>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
