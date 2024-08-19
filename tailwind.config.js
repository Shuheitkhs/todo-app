/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F5",
        primary: "#ff79b0",
        primarydark: "#FF4081",
        accent: "#00E5FF",
        accentdark: "#00BFFF",
        text: "#333333",
      },
    },
  },
  plugins: [],
};
