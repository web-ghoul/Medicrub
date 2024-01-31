/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        "0":"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;",
        "1":"rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;",
      },
      colors: {
        primary:"#FF0000",
        secondary:"#0B2533",
        white:"#fff"
      },
      screens: {
        "sm":"520px",
        "md":"768px",
        "lg":"992px",
        "xl":"1200px",
        "2xl":"1440px",
      }
    },
  },
  plugins: [],
}