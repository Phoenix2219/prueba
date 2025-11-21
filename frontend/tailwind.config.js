/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "media", 
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EBF5EE",
        secondary: "#542344",
        fondo1: "#0d0d1b"
      },

      screens: {
        xxs: "360px",
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },

      backgroundImage: {
        'dot-light': 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
        'dot-dark': 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dot': '12px 13px',
      }
    },
  },
  plugins: [],
}
