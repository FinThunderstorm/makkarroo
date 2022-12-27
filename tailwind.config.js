/** @type {import('tailwindcss').Config} */
/* eslint-disable global-require */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("@tailwindcss/typography"), require("rippleui")],
}
