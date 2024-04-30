/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        customPlum: '#5F0F40',
        customRed: '#9A031E',
        customDarkOrange: '#E36414',
        customLightOrange: '#FB8B24',
        customTurquoise: '#0F4C5C',
        customWhiteGray: '#EFEFEF'
      }
    },
  },
  plugins: [],
}

