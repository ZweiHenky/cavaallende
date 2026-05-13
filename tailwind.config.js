

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
      fontFamily: {
        'sans': ['Inter_400Regular', 'sans-serif'],
        'medium': ['Inter_500Medium', 'sans-serif'],
        'semibold': ['Inter_600SemiBold', 'sans-serif'],
        'bold': ['Inter_700Bold', 'sans-serif'],
        'extrabold': ['Inter_800ExtraBold', 'sans-serif'],
        'black': ['Inter_900Black', 'sans-serif'],
        'fraunces-regular': ['Fraunces_400Regular', 'serif'],
        'fraunces-medium': ['Fraunces_500Medium', 'serif'],
        'fraunces-semibold': ['Fraunces_600SemiBold', 'serif'],
        'fraunces-bold': ['Fraunces_700Bold', 'serif'],
        'fraunces-extrabold': ['Fraunces_800ExtraBold', 'serif'],
        'fraunces-black': ['Fraunces_900Black', 'serif'],
      },
    },
  },
  plugins: [],
}

