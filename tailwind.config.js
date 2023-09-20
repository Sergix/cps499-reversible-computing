/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'templates/**/*.vue',
    'plugins/**/*.js',
    'nuxt.config.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['PP Neue Machina', ...defaultTheme.fontFamily.sans],
        sans: ['PP Mori', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}

