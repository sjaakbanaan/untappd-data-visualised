/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        lightup: {
          '0%, 100%': { background: 'none' },
          '50%': { background: 'rgba(234, 179, 8, 0.7)' },
        },
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
