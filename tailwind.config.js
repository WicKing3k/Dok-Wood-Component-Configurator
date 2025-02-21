/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand': {
          orange: '#F15A22',
          brown: '#8B4513',
        }
      },
    },
  },
  plugins: [],
};