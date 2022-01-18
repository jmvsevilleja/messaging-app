module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5d1ea5",
        secondary: "#7025c6",
        font: "#4F5E7B"

      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        xs: ["0.675rem", {lineHeight: "1.5"}],
        sm: ["0.75rem", {lineHeight: "1.5715"}],
        base: ["0.875rem", {lineHeight: "1.5"}],
        normal: ["1rem", {lineHeight: "1.5", letterSpacing: "-0.01em"}],
        lg: ["1.125rem", {lineHeight: "1.5", letterSpacing: "-0.01em"}],
        xl: ["1.25rem", {lineHeight: "1.5", letterSpacing: "-0.01em"}],
        "2xl": ["1.5rem", {lineHeight: "1.33", letterSpacing: "-0.01em"}],
        "3xl": ["1.88rem", {lineHeight: "1.33", letterSpacing: "-0.01em"}],
        "4xl": ["2.25rem", {lineHeight: "1.25", letterSpacing: "-0.02em"}],
        "5xl": ["3rem", {lineHeight: "1.25", letterSpacing: "-0.02em"}],
        "6xl": ["3.75rem", {lineHeight: "1.2", letterSpacing: "-0.02em"}],
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
