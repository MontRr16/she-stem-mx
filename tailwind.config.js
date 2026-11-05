/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pastel: {
          yellow: '#fbf8cc',
          peach: '#fde4cf',
          rose: '#ffcfd2',
          orchid: '#f1c0e8',
          lilac: '#cfbaf0',
          sky: '#a3c4f3',
          cyan: '#90dbf4',
          turquoise: '#8eecf5',
          mint: '#98f5e1',
          green: '#b9fbc0',
        },
        ink: {
          DEFAULT: '#1d3437',
          soft: '#4a6064',
          muted: '#6b8084',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        accent: ['Tangerine', 'cursive'],
        sans: ['Quicksand', 'system-ui', 'sans-serif'],
        mono: ['Inconsolata', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(29, 52, 55, 0.04), 0 8px 24px rgba(29, 52, 55, 0.06)',
        lift: '0 2px 4px rgba(29, 52, 55, 0.05), 0 16px 40px rgba(29, 52, 55, 0.10)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};
