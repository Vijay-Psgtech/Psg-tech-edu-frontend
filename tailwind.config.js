/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0c1a33",
        "ink-2": "#142a4d",
        paper: "#fbf9f4",
        cream: "#f4efe3",
        gold: "#c9972c",
        "gold-bright": "#e6b53d",
        line: "#d9d2c1",
      },
      fontFamily: {
        display: ["Fraunces", "Iowan Old Style", "Georgia", "serif"],
        body: ["Source Sans 3", "Segoe UI", "sans-serif"],
      },
      keyframes: {
        "home-rise": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};