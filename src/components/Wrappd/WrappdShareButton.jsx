import PropTypes from 'prop-types';
import Icon from '../UI/Icon/Icon';

const WrappdShareButton = ({ userName }) => {
  return (
    <div className="mt-4 md:mt-0">
      <button
        type="button"
        aria-label="Share"
        className="flex justify-center rounded px-2 py-1 hover:bg-gray-700"
        onClick={() => {
          if (navigator.share) {
            navigator
              .share({
                title: document.title,
                text: `Check out ${userName}'s Tappd Wrappd!`,
                url: window.location.href,
              })
              .catch(() => {});
          } else {
            alert('Web Share not supported on this device.');
          }
        }}
      >
        <span>SHARE</span>
        <Icon icon="SHARE" className="-mt-1 ml-2 w-3" fill="white" />
      </button>
    </div>
  );
};

WrappdShareButton.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default WrappdShareButton;
