/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gallery': {
          'bg': '#FAFAF8',
          'surface': '#FFFFFF',
          'border': '#E5E5E0',
          'text': '#1A1A1A',
          'text-secondary': '#666666',
          'accent': '#1C69D4',
        }
      },
      fontFamily: {
        'display': ['Corben', 'Georgia', 'serif'],
        'body': ['Corben', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
