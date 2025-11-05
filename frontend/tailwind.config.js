/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: '#155DFC',
        faded: '#62748E',
        text: {
          default: '#020618',
        },
      },
      borderColor: {
        'cancel-btn': '#E2E8F0',
        faded: '#E2E8F0',
      },
      textColor: {
        'cancel-btn': '#0F172B',
        default: '#020618',
        faded: '#62748E',
      },
      fontSize: {
        heading1: '60px',
        heading2: '36px',
        subtitle: '18px',
        body: '14px',
      },
      backgroundColor: {
        'page-default': '#ffffff',
        dark: '#020618',
      },
      width: {
        '7xl': '1240px',
      },
    },
  },
  plugins: [],
};
