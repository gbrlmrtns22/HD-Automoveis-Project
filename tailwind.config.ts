import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        success: '#16a34a',
        warning: '#f59e0b',
        error: '#dc2626',
        info: '#0ea5e9'
      },
      spacing: {
        4: '1rem',
        8: '2rem',
        12: '3rem'
      }
    }
  },
  plugins: []
};

export default config;
