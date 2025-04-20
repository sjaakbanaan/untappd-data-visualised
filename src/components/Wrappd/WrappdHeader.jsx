import PropTypes from 'prop-types';
import { formatWrappdDates } from '../../utils';

const WrappdHeader = ({ userName, userAvatar, dateRange }) => {
  return (
    <header className="mb-10 flex items-center">
      {userAvatar && (
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
};

export default WrappdHeader;
