/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-mode": "#242424",
      },
      transitionDelay: {
        0: "0ms",
        200: "200ms",
        500: "500ms",
        1000: "1000ms",
      },
      animation: {
        slideDown: "slideDown 0.5s ease-in-out",
      },
      keyframes: {
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
