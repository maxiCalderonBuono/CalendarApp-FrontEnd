/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts, tsx, html}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        sans: "Helvetica, Arial, sans-serif",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
