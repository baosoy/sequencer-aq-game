/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#1A1A1A",
        green: {
          500: "#BAC7AB",
        },
        gray: {
          500: "#D9D9D9",
        },
        brown: {
          500: "#C7BDAB",
        },
      },
    },
  },
  plugins: [],
};
