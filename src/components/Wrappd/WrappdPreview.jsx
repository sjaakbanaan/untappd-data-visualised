import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const WRAPPD_DEMO_URL = 'https://tappd.online/wrappd/aDSiT9lClQBgRVyjLQy2';

// const PREVIEW_WIDTH = 376;
const PREVIEW_HEIGHT = 680;

const WrappdPreview = ({ url = WRAPPD_DEMO_URL }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [url]);

  return (
    <div
      className="relative mx-auto shrink-0 overflow-hidden"
      style={{ width: '100%', height: PREVIEW_HEIGHT + 20 }}
      aria-label="Wrappd preview"
    >
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900">
          <div className="size-8 animate-spin rounded-full border-2 border-yellow-500 border-t-transparent" />
        </div>
      )}
      <iframe
        key={url}
        src={url}
        title="Wrappd preview"
        width="100%"
        height={PREVIEW_HEIGHT}
        className="block border-0 bg-gray-900"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

WrappdPreview.propTypes = {
  url: PropTypes.string,
};

export default WrappdPreview;
