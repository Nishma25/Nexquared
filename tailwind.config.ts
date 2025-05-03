/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nexquared-dark': '#120f24',
        'nexquared-purple': '#5747b7',
        'nexquared-purple-light': '#6858c8',
        'nexquared-purple-deep': '#4c1d95',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'nexquared-gradient': 'linear-gradient(to right,rgb(35, 25, 65) 0%, #140d26 100%)',
      },
    },
  },
  plugins: [],
};