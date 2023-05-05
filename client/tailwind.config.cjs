/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      clash400: ['ClashGrotesk-Regular', 'sans-serif'],
      clash500: ['ClashGrotesk-Medium', 'sans-serif'],
      clash600: ['ClashGrotesk-Semibold', 'sans-serif'],
      clash700: ['ClashGrotesk-Bold', 'sans-serif'],
    },
    screens: {
      sm: { min: '0px', max: '767px' },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: '768px', max: '1023px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: '1024px', max: '1280px' },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: '1281px' },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }
    },

    extend: {
      colors: {
        green1: '#43B249',
        green2: '#67BF6B',
        green3: '#AEDAB0',
        green4: '#8ACD8E',
        whiteBg: '#FFFFFF',
        greyBg: '#F5F5F5',
        font1: '#003503',
        font2: '#FFFFFF',
        font3: '#000000',
        font4: '#0A142F',
        font5: '#7D8398',
        fontRed: '#DE2D14',
      },
    },
  },
  plugins: [],
};
