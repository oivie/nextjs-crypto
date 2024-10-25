/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Include all JS, TS, JSX, TSX files in the app folder
    './pages/**/*.{js,ts,jsx,tsx}', // Include all files in the pages folder
    './components/**/*.{js,ts,jsx,tsx}', // Include all files in the components folder
  ],
  theme: {
    extend: {
      backdropBlur: {
        'none': 'none',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '24px',
      },
    },
  },
  plugins: [],
};

