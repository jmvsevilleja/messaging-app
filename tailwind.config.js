module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#213766",
        secondary: "#2a4782",
        tertiary: "#00639d",
        font: "#213766"

      },
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        xs: ["0.7rem", {lineHeight: "1.5"}],
        sm: ["0.8rem", {lineHeight: "1.5715"}],
        base: ["0.9rem", {lineHeight: "1.5"}],
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
  plugins: [require('@tailwindcss/forms'),]
};
