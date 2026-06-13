/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'landscape-mobile': { 'raw': '(orientation: landscape) and (max-height: 500px)' },
      },
    },
  },
  plugins: [],
}