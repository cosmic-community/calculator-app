/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        'calc-dark': '#1a1a1a',
        'calc-darker': '#0d1117',
        'calc-accent': '#3b82f6',
        'calc-accent-hover': '#2563eb',
        'calc-operation': '#f59e0b',
        'calc-operation-hover': '#d97706',
        'calc-number': '#374151',
        'calc-number-hover': '#4b5563',
        'calc-clear': '#ef4444',
        'calc-clear-hover': '#dc2626',
      },
      boxShadow: {
        'calc': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'button': '0 2px 8px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
}