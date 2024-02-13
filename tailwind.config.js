/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  variants: {
    extend: {
      backgroundColor: ["dark"],
      borderColor: ["dark"],
      textColor: ["dark"],
    },
  },
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-mode": "#242424",
        "ultra-dark-mode": "#1a1a1a",
        "light-mode": "#ffffff",
        "ultra-light-mode": "#d2d3db",
      },
      transitionDelay: {
        0: "0ms",
        200: "200ms",
        500: "500ms",
        1000: "1000ms",
      },
    },
  },
  plugins: [],
};
