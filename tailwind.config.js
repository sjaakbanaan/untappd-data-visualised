/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    // needed because of dynamic value in WrappdPhotos.jsx
    'col-span-6',
    'col-span-4',
  ],
  theme: {
    extend: {
      keyframes: {
        lightup: {
          '0%, 100%': { background: 'none' },
          '50%': { background: 'rgba(234, 179, 8, 0.7)' },
        },
      },
      backgroundImage: {
        'wrappd-gradient': 'linear-gradient(193deg, #480DE8 0%, #EE8434 100%)',
      },
      colors: {
        wrappdYellow: '#EE8434',
        wrappdBlue: '#480DE8',
        wrappdBlack: '#1C1D21',
      },
      animation: {
        lightup: 'lightup 1s ease-in-out',
      },
      gridTemplateColumns: {
        500: 'repeat(500, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
