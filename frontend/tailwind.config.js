/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        primary: '#155DFC',
        text: {
          default: '#020618',
          faded: '#62748E',
        },
      },
      borderColor: {
        'cancel-btn': '#E2E8F0',
        input: '#E2E8F0',
      },
      textColor: {
        'cancel-btn': '#0F172B',
        default: '#020618',
      },
      fontSize: {
        heading1: '60px',
        heading2: '36px',
        subtitle: '18px',
        body: '14px',
      },
      backgroundColor: {
        'page-default': '#F8F9FA',
      },
    },
  },
  plugins: [],
};
