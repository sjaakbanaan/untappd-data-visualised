import * as React from 'react';

const ICON =
  'M12 2c-4.418 0-8 4.003-8 8.5 0 4.462 2.553 9.312 6.537 11.174a3.45 3.45 0 0 0 2.926 0C17.447 19.812 20 14.962 20 10.5 20 6.003 16.418 2 12 2ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z';

function Pin({ size = 42 }) {
  return (
    <svg
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#fff"
    >
      <path fill="#eab308" d={ICON} />
    </svg>
  );
}

export default React.memo(Pin);
