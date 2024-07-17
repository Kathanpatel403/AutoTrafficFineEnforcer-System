/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/**.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      },
      scale: {
        '105': '1.05'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}