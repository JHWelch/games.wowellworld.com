/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cabin', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // eslint-disable-line
  ],
}
