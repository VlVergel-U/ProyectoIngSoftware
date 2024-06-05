/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/renderer/src/index.html",
    "./src/renderer/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#001b76',
        'primary-hover': '#002cc2',
        'dark-primary': '#000f43', 
        'dark-primary-hover': '#334c7d',
      },
    },
  },
  plugins: [

  ],
}