/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class', ':global(.dark)'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', ...fontFamily.sans],
        mono: ['var(--font-robotomono)', ...fontFamily.mono],
      },
    },
  },
  plugins: [],
};
