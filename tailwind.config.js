/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,tsx,ts,jsx}',
    './components/**/*.{js,tsx,ts,jsx}',
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#E6DCC8',
        secondary: '#8FAE9E',
        tertiary: '#4F6F5D',
        textColor: '#6E6A5E',
      },
    },
  },
  plugins: [],
}

