/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lilita: ['Lilita One', 'system-ui']
      },
      colors: {
        darkBlue: '#00292e',
        yellow: '#FFC83D',
        darkOrange: '#f12d00',
        grey: '#81969c',
        lightGrey: '#E0E6E7',
        green: '#327124',
        lightGreen: '#86c44f',
        black: '#000000',
        white: '#FBFBFB'
      }
    }
  },
  plugins: []
}
