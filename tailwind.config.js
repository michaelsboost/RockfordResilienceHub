module.exports = {
  content: [
    './*.html',
    './src/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        roku: {
          50:  '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c22d3',
          800: '#662d91',
          900: '#581c87',
        },
        purple: {
          50:  '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c22d3',
          800: '#662d91',
          900: '#581c87',
        },
      },
      backgroundImage: {
        'roku-gradient': 'linear-gradient(135deg, #662d91 0%, #9333ea 50%, #c084fc 100%)',
        'roku-gradient-dark': 'linear-gradient(135deg, #581c87 0%, #7c22d3 50%, #a855f7 100%)',
      },
    },
  },
  safelist: [
    // if you reference these only via JS/conditions, safelist them:
    'bg-roku-gradient',
    'bg-roku-gradient-dark',
  ],
  plugins: [],
};