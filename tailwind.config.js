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
          400: '#1adbff',
          500: '#00c3e6',
          600: '#0098b3',
          700: '#006d80',
          800: '#00424d',
          900: '#00181a',
        },
        dark: {
          bg: '#070a12',
          card: '#0e1322',
          border: '#1b2438',
          hover: '#141c30',
        },
        electric: '#3b82f6',
        neon: '#00f0ff',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-cairo)', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'sans-serif'],
        mono: ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(to right, rgba(0,240,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,240,255,0.03) 1px, transparent 1px)',
        'hero-gradient': 'radial-gradient(ellipse at 50% -20%, rgba(0,240,255,0.15), rgba(59,130,246,0.1) 50%, transparent 80%)',
      },
      boxShadow: {
        'neon-glow': '0 0 20px rgba(0, 240, 255, 0.25)',
        'neon-strong': '0 0 35px rgba(0, 240, 255, 0.45)',
        'blue-glow': '0 0 20px rgba(59, 130, 246, 0.25)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
