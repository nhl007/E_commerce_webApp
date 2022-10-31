/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main_background: '#EAEDED',
        primary: '#131921',
        secoendary: '#232F3E',
        text_color: '#D7D9DC',
      },
      screens: {
        sm: { min: '200px', max: '1023px' },
        // => @media (min-width: 640px and max-width: 767px) { ... }
        lg: { min: '1024px', max: '1281px' },
        // => @media (min-width: 1024px and max-width: 1279px) { ... }

        xl: { min: '1282px', max: '1535px' },
        // => @media (min-width: 1280px and max-width: 1535px) { ... }

        '2xl': { min: '1536px' },
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [],
};
