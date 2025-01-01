import { formatWrappdDates } from '../../utils';

const WrappdHeader = ({ storedAvatar, userName, customTitle, filterDateRange }) => {
  return (
    <header className="mb-10 flex items-center">
      {storedAvatar && (
        <img
          crossOrigin="anonymous"
          className="mr-6 w-32 rounded-full"
          src={storedAvatar}
          alt=""
        />
      )}
      <div>
        <div className="-mt-8 mb-2 text-3xl">{userName}</div>
        <div className="text-wrappdYellow">
          {customTitle
            ? customTitle
            : formatWrappdDates(filterDateRange.start, filterDateRange.end)}
        </div>
      </div>
    </header>
  );
};

export default WrappdHeader;
