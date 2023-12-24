/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{css,js}"],
  theme: {
    extend: {
      colors: {
        primaryBG: "#4a4e69",
        iconsColor: "#22223b",
        fontColor: "#f2e9e4",
      },
    },
  },
  plugins: [],
};
