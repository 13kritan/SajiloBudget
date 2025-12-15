/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "350px",
        md: "768px",
        lg: "1100px",
        xl: "1600px",
      },
    },
  },
  plugins: [],
};
