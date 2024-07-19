const ICONS = {
  BEER: {
    path: 'M235.39 0h4c36.504 28.298 61.671 64.632 75.5 109 1.323 3.946 1.99 7.946 2 12a318.009 318.009 0 0 0-32 28c-14.187-14.682-30.02-27.348-47.5-38-17.482 10.652-33.315 23.318-47.5 38a318.009 318.009 0 0 0-32-28c4.047-22.112 12.047-42.779 24-62a279.692 279.692 0 0 1 24-32 374.24 374.24 0 0 1 29.5-27zm-171 111c43.391 8.015 79.057 28.848 107 62.5-18.626 30.209-29.459 63.042-32.5 98.5-26.843-15.782-55.677-26.115-86.5-31-11.734-44.812-7.734-88.146 12-130zm344 0c.995-.086 1.828.248 2.5 1 19.26 41.636 23.092 84.636 11.5 129-30.825 4.885-59.659 15.218-86.5 31-3.043-35.458-13.876-68.291-32.5-98.5 27.561-33.123 62.561-53.956 105-62.5zm-172 34c31.683 22.646 52.517 52.979 62.5 91 5.424 18.974 7.757 38.307 7 58-30.404 26.574-53.238 58.574-68.5 96-15.264-37.426-38.098-69.426-68.5-96-1.296-46.446 12.37-87.78 41-124a309.95 309.95 0 0 1 26.5-25zm-14 367h-40c-76.49-11.646-131.657-52.312-165.5-122-17-39.329-21.167-79.995-12.5-122 84.766-2.875 148.933 31.792 192.5 104 17.2 30.974 26.034 64.141 26.5 99.5a415.804 415.804 0 0 0-1 40.5zm70 0h-41c-8.937-85.57 20.063-154.737 87-207.5 39.583-27.689 83.583-39.855 132-36.5 14.14 92.868-17.86 165.035-96 216.5-25.589 14.696-52.923 23.863-82 27.5z',
    viewBox: '0 0 473.639 512',
  },
  CALENDAR: {
    path: 'M61 0h37v60h72V0h38v60h72V0h38v60h72V0h37v60h61v99H0V60h61zM488 512H0V195h488z',
    viewBox: '0 0 488 512',
  },
  STAR: {
    path: 'M511.5 196.5v2a6103.515 6103.515 0 0 0-142 121l45.5 178c.667 1.667.667 3.333 0 5a39387.715 39387.715 0 0 0-159.5-101l-160 101a7346.054 7346.054 0 0 1 46-183 9568.252 9568.252 0 0 0-142-121v-2a26123.999 26123.999 0 0 0 186-12 9435.267 9435.267 0 0 1 70-176 19923.045 19923.045 0 0 1 70 175 6328.988 6328.988 0 0 0 186 13Z',
    viewBox: '0 0 512 512',
  },
  LOCATION: {
    path: 'M35.375 0C15.838 0 0 15.838 0 35.375c0 8.722 3.171 16.693 8.404 22.861L35.375 90l26.97-31.765c5.233-6.167 8.404-14.139 8.404-22.861C70.75 15.838 54.912 0 35.375 0Zm0 48.705c-8.035 0-14.548-6.513-14.548-14.548s6.513-14.548 14.548-14.548 14.548 6.513 14.548 14.548-6.513 14.548-14.548 14.548z',
    viewBox: '0 0 70.749 90',
  },
  FRIENDS: {
    path: 'M142.5 56.5c52.025-1.918 86.191 21.748 102.5 71 10.362 43.91-1.471 80.41-35.5 109.5-35.758 24.201-71.758 24.534-108 1-32.87-26.928-45.703-61.428-38.5-103.5 10.257-42.759 36.757-68.759 79.5-78zM357.5 70.5c39.129-1.864 66.962 14.802 83.5 50 14.553 39.95 6.387 74.45-24.5 103.5-32.667 23.333-65.333 23.333-98 0-29.83-27.48-38.663-60.647-26.5-99.5 12.134-29.957 33.968-47.957 65.5-54zM511.5 380.5v47h-172c-4.522-54.886-27.856-99.719-70-134.5 22.593-20.622 49.26-32.622 80-36 61.152-5.5 108.652 17 142.5 67.5 10.015 17.549 16.515 36.216 19.5 56zM-.5 454.5v-35c9.985-63.492 45.319-105.992 106-127.5 44.769-12.417 87.769-8.084 129 13 54.554 34.603 79.887 84.436 76 149.5H-.5z',
    viewBox: '0 0 512 398.108',
  },
  ARROW: {
    path: 'm17 9.5-5 5-5-5',
    viewBox: '0 0 24 24',
  },
  UNTAPPD: {
    path: 'M11 13.299l-5.824 8.133c-.298.416-.8.635-1.308.572-.578-.072-1.374-.289-2.195-.879S.392 19.849.139 19.323a1.402 1.402 0 0 1 .122-1.425l5.824-8.133a3.066 3.066 0 0 1 1.062-.927l1.146-.604c.23-.121.436-.283.608-.478.556-.631 2.049-2.284 4.696-4.957l.046-.212a.134.134 0 0 1 .096-.1l.146-.037a.135.135 0 0 0 .101-.141l-.015-.18a.13.13 0 0 1 .125-.142c.176-.005.518.046 1.001.393s.64.656.692.824a.13.13 0 0 1-.095.164l-.175.044a.133.133 0 0 0-.101.141l.012.15a.131.131 0 0 1-.063.123l-.186.112c-1.679 3.369-2.764 5.316-3.183 6.046a2.157 2.157 0 0 0-.257.73l-.205 1.281A3.074 3.074 0 0 1 11 13.3zm12.739 4.598l-5.824-8.133a3.066 3.066 0 0 0-1.062-.927l-1.146-.605a2.138 2.138 0 0 1-.608-.478 50.504 50.504 0 0 0-.587-.654.089.089 0 0 0-.142.018 97.261 97.261 0 0 1-1.745 3.223 1.42 1.42 0 0 0-.171.485 3.518 3.518 0 0 0 0 1.103l.01.064c.075.471.259.918.536 1.305l5.824 8.133c.296.413.79.635 1.294.574a4.759 4.759 0 0 0 2.209-.881 4.762 4.762 0 0 0 1.533-1.802 1.4 1.4 0 0 0-.122-1.425zM8.306 3.366l.175.044a.134.134 0 0 1 .101.141l-.012.15a.13.13 0 0 0 .063.123l.186.112c.311.623.599 1.194.869 1.721.026.051.091.06.129.019.437-.469.964-1.025 1.585-1.668a.137.137 0 0 0 .003-.19c-.315-.322-.645-.659-1.002-1.02l-.046-.212a.13.13 0 0 0-.096-.099l-.146-.037a.135.135 0 0 1-.101-.141l.015-.18a.13.13 0 0 0-.123-.142c-.175-.005-.518.045-1.002.393-.483.347-.64.656-.692.824a.13.13 0 0 0 .095.164z',
    viewBox: '0 0 24 24',
  },
  GITHUB: {
    path: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    viewBox: '0 0 24 24',
  },
  INFO: {
    path: 'M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z',
    viewBox: '0 0 20 20',
  },
  PIN: {
    path: 'M12 2c-4.418 0-8 4.003-8 8.5 0 4.462 2.553 9.312 6.537 11.174a3.45 3.45 0 0 0 2.926 0C17.447 19.812 20 14.962 20 10.5 20 6.003 16.418 2 12 2ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
    viewBox: '0 0 24 24',
  },
};

export default ICONS;
