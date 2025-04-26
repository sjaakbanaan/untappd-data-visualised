import PropTypes from 'prop-types';
import { formatWrappdDates } from '../../utils/';
import ActiveFiltersDisplay from './ActiveFiltersDisplay';

const WrappdHeader = ({ userName, userAvatar, dateRange, filterOverview }) => {
  return (
    <header className="mb-10 flex items-center">
      {userAvatar && userAvatar.startsWith('data:image/jpeg;base64') && (
        <img
          crossOrigin="anonymous"
          className="mr-6 w-16 rounded-full md:w-32"
          src={userAvatar}
          alt=""
        />
      )}
      <div className="flex flex-col truncate">
        <div className="mb-1 truncate text-3xl">{userName}</div>
        <div className="whitespace-normal text-wrappdYellow">
          {formatWrappdDates(dateRange.start, dateRange.end)}
          <ActiveFiltersDisplay filterOverview={filterOverview} />
        </div>
      </div>
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
