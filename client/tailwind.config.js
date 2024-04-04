/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5542F6',
        primaryLight: '#8379ff',
        highLight:'#eae8fb',
        bgGray:'#f1f1f1'
      },
    },
  },
  plugins: [],
}

