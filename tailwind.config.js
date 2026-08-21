/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          50: '#e6f9ff',
          100: '#b3f2ff',
          200: '#80eaff',
          300: '#4de3ff',
          400: '#00d9ff',
          500: '#00b8d9',
          600: '#008ba3',
          700: '#005f70',
          800: '#00333d',
          900: '#001a1f',
        },
        dark: {
          bg: '#07111F',
          surface: '#0B1528',
          card: '#0D192D',
          cardHover: '#11223E',
          border: '#1C335A',
          borderLight: '#2A4B80',
          muted: '#AAB6C4',
          text: '#F5F7FA',
        },
        electric: '#1677FF',
        accent: '#00D9FF',
        status: {
          pass: '#10B981',
          block: '#EF4444',
          warn: '#F59E0B',
          info: '#3B82F6',
        },
      },
      fontFamily: {
        sans: ['var(--font-cairo)', 'var(--font-inter)', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'Monaco', 'Consolas', 'monospace'],
        tech: ['Rajdhani', 'var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(to right, rgba(0,217,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,217,255,0.025) 1px, transparent 1px)',
        'hero-gradient': 'radial-gradient(ellipse at 50% 0%, rgba(0,217,255,0.08), rgba(22,119,255,0.04) 50%, transparent 80%)',
      },
      boxShadow: {
        'neon-subtle': '0 0 15px rgba(0, 217, 255, 0.15)',
        'neon-glow': '0 0 25px rgba(0, 217, 255, 0.25)',
        'card-border': '0 0 0 1px #1C335A',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
