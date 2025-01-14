/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        fontFamily:{
            lato: ['Lato', 'sans-serif'],
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

