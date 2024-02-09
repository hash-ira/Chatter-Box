/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '600px',

        'md': '900px',

  
        'lg': '1200px',

  
        'xl': '1536px',
        
      }
    },
  },
  plugins: [],
}

