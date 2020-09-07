module.exports = {
  purge: ["src/**/**/*.js", "src/**/**/*.jsx", "dist/**/*.html"],
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [
    require("@tailwindcss/ui")({
      layout: "sidebar"
    })
  ]
};
