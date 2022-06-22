/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "fab-slider": "url('/src/images/fabSliderBg.png')",
      },
    },
  },
  plugins: [],
}
