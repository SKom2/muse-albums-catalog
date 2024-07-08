/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ["Montserrat", 'sans-serif'],
        'roboto': ["Roboto", 'sans-serif'],
      },
      colors: {
        bg: "rgba(var(--main-bg-color))",
        screen: "rgba(var(--primary-screen-color))",
        primaryText: "rgba(var(--primary-text-color))"
      }
    },
  },
  plugins: [],
}