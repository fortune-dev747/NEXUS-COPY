/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f2f4f7',
          100: '#e3e7ee',
          200: '#c3cbd9',
          300: '#9aa6bd',
          400: '#6b7994',
          500: '#4c5877',
          600: '#39435f',
          700: '#2b3349',
          800: '#1c2233',
          900: '#12151f',
          950: '#0a0c13',
        },
        paper: {
          DEFAULT: '#faf8f3',
          dim: '#f1ede3',
        },
        accent: {
          DEFAULT: '#3b6e71',
          light: '#5c9093',
          dark: '#2a4f52',
        },
        clay: '#c17a4f',
      },
      fontFamily: {
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        sheet: '0 1px 2px rgba(18,21,31,0.06), 0 12px 32px -8px rgba(18,21,31,0.18)',
      },
    },
  },
  plugins: [],
}
