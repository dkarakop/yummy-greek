/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        darkBlue: '#00292e',
        darkGrey: '#474E4F',
        darkYellow: '#d6b769',
        darkOrange: '#f12d00',
        green: '#327124',
        grey: '#81969c',
        yellow: '#FFC83D',
        lightGreen: '#86c44f',
        lightGrey: '#E0E6E7',
        lightYellow: '#F0D081',
        white: '#FBFBFB'
      }
    }
  },
  plugins: []
}
