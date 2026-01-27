const { background } = require('@cloudinary/url-gen/qualifiers/focusOn');

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
        background: '#f5f2eb',
        primary: '#1c1c1c',
        secondary: '#5a0f1b',
        tertiary: '#c9a24d',
        textColor: '#8c8c8c',
      },
    },
  },
  plugins: [],
}

