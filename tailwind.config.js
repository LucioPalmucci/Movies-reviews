/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        fontFamily:{
            Rubik: ['Rubik', 'sans-serif'],
        },
        textColor:{
            brown:{
                DEFAULT: "rgb(87, 22, 22)",
            },
        },
    },
  },
  plugins: [],
}

