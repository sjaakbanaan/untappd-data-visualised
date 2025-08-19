import PropTypes from 'prop-types';
import { formatWrappdDates } from '../../utils/';
import ActiveFiltersDisplay from './ActiveFiltersDisplay';
import WrappdShareButton from './WrappdShareButton';

const WrappdHeader = ({
  userName,
  userAvatar,
  dateRange,
  filterOverview,
  shareLinkTitle,
}) => {
  return (
    <header className="mb-10 flex flex-col justify-between md:flex-row md:items-center">
      <div className="flex items-center">
        {userAvatar && userAvatar.startsWith('data:image/jpeg;base64') && (
          <img
            crossOrigin="anonymous"
            className="mr-6 w-16 rounded-full md:w-24"
            src={userAvatar}
            alt=""
          />
        )}
        <div className="flex flex-col truncate">
          <h1 className="mb-1 truncate text-3xl">{userName}</h1>
          <div className="whitespace-normal text-wrappdYellow">
            {shareLinkTitle && <h2 className="text-xl mt-1">{shareLinkTitle}</h2>}
            <h3 className="text-gray-400">
              {formatWrappdDates(dateRange.start, dateRange.end)}
            </h3>
            <ActiveFiltersDisplay filterOverview={filterOverview} />
          </div>
        </div>
      </div>
      <WrappdShareButton userName={userName} />
    </header>
  );
};

WrappdHeader.propTypes = {
  userName: PropTypes.string.isRequired,
  userAvatar: PropTypes.string,
  dateRange: PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  }).isRequired,
  filterOverview: PropTypes.object.isRequired,
};

export default WrappdHeader;
