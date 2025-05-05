/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", 
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./constants/**/*.{js,ts,jsx,tsx}",
    "./scripts/**/*.{js,ts,jsx,tsx}",
  ],
presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.6rem',
      },
    },
  },
  plugins: [],
}