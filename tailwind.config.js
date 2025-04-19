/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
        min1Max2: 'repeat(auto-fit, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        'auto-1fr': 'auto 1fr 28px',
      },
    },
  },
  plugins: [],
};
