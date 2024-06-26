/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{svelte,js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        sec: "#111113",
        pri: "#000000",
        offwhite: "#d1cdc7",
      },
      fontFamily: {
        typeface: ["Lato", '"Helvetica Neue"', "helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};
