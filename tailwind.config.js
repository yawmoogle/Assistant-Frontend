/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'blue': '#34c3eb',
      'red': '#f70707',
      'grey-dark': '#3d3b3b',
      'grey': '#706e6e',
      'grey-light': '#aba6a6',
    },
    fontFamily: {
      sans: [],
      serif: [],
    },
    extend: {
    },
  },
  plugins: [],
}

