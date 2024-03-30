/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        500: 'repeat(500, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
