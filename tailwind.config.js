/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        200: "200%", // 200% of parent's width
      },
      height: {
        200: "200%", // 200% of parent's height
      },
      colors: {
        "dark-mode": "#242424",
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
