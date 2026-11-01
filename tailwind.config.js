/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#141517', soft: '#1C1D20', line: '#2A2C30', mute: '#8E8F8A' },
        ivory: { DEFAULT: '#F2EDE3', deep: '#E8E1D3', line: '#D8D0BF' },
        sage: { DEFAULT: '#9DAA8C', dark: '#4F5C41', deep: '#3E4934' },
        lime: { DEFAULT: '#D4FF3A' },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { page: '1360px' },
    },
  },
  plugins: [],
};
