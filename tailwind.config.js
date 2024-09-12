/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#FFAF87',
        story: '#4CE0B3',
        button: '#FF8E72',
      },
    },
  },
  plugins: [],
}

