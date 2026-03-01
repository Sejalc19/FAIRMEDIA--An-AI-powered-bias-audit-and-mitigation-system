/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#2563eb',
        },
        bg: {
          soft: '#fcfcfd',
        },
        bias: {
          low: '#22c55e',
          medium: '#f59e0b',
          high: '#f43f5e',
        },
        highlight: {
          peach: '#ffedd5',
          yellow: '#fef9c3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
