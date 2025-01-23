/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/page.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  corePlugins: {
    margin: true,
    padding: true,
    textDecoration: false,
    fontSize: false,
  },
  plugins: [],
};
