/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#0D6EFD",
      secondary: "#6C757D",
      success: "#28A745",
      danger: "#DC3545",
      warning: "#FFC107",
      info: "#17A2B8",
      light: "#F8F9FA",
      dark: "#343A40",
      white: "#FFFFFF",
      transparent: "transparent",
      blue: {
        900: "#2A2F3E",
        300: "#928A8A",
      },
      black: {
        900: "#000000",
        700: "#343A40",
        500: "#6c757d",
        400: "#6c757d",
        300: "#a7a7a7",
        200: "#d3d3d3",
        100: "#f5f5f5",
      },
      textMainColor: {
        900: "#FFFFFF",
      },
      borderOutlineColor: {
        900: "#a7a7a7",
      },
    },
    screens: {
      "4xl": { max: "2047px" },
      // => @media (max-width: 2047px) { ... }

      "3xl": { max: "1791px" },
      // => @media (max-width: 1791px) { ... }

      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {},
  },
  plugins: [],
};