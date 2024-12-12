/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";

export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Trebuchet MS"],
        title: ["Lato"],
      },
    },
  },
  plugins: [typography],
};
