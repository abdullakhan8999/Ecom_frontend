/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'min-w-940': '940px',
      },
    },
  },
  variants: {
    extend: {
      textDecoration: ['hover', 'focus', 'group-hover'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}

