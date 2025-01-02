import { useEffect, useState } from 'react';
import { formatWrappdDates, toDataURL } from '../../utils';

const WrappdHeader = ({ storedAvatar, userName, customTitle, filterDateRange }) => {
  const [avatarDataUrl, setAvatarDataUrl] = useState(null);

  useEffect(() => {
    if (storedAvatar) {
      (async () => {
        const dataUrl = await toDataURL(storedAvatar);
        setAvatarDataUrl(dataUrl);
      })();
    }
  }, [storedAvatar]);

  return (
    <header className="mb-10 flex items-center">
      {storedAvatar && (
        <img
          crossOrigin="anonymous"
          className="mr-6 w-32 rounded-full"
          src={avatarDataUrl || storedAvatar} // Use the data URL if available, fallback to the original src
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
