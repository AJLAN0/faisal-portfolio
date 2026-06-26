/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '2rem',
        lg: '2.5rem',
        xl: '3rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // Warm beige / sand — primary light backgrounds
        sand: {
          50: '#FAF6EE',
          100: '#F4ECDD',
          200: '#EADCC4',
          300: '#DFC9A6',
          400: '#CDB07E',
          500: '#B8945A',
          600: '#9A7843',
        },
        // Deep black / charcoal — dark premium sections
        charcoal: {
          950: '#0B0907',
          900: '#13100D',
          800: '#1C1813',
          700: '#272019',
          600: '#352B21',
          500: '#4A3D2F',
        },
        // Logo-derived brand accents
        brand: {
          red: '#C1272D',
          'red-light': '#D83A40',
          'red-dark': '#9C1B20',
          green: '#1B4D3E', // Saudi heritage dark green (secondary accent)
          'green-light': '#2E6B57',
          'green-dark': '#103328',
          maroon: '#5E1B23', // burgundy / dark maroon (headings)
          'maroon-light': '#7C2731',
          'maroon-dark': '#3F1117',
          gold: '#C9A24B', // warm night lighting / Diriyah glow
          'gold-light': '#E6C988',
        },
      },
      fontFamily: {
        sans: ['Tajawal', 'system-ui', 'sans-serif'],
        // Geometric Najdi Kufi for headings & brand
        display: ['"Reem Kufi"', 'Tajawal', 'sans-serif'],
      },
      boxShadow: {
        card: '0 18px 40px -24px rgba(19, 16, 13, 0.45)',
        'card-hover': '0 30px 60px -28px rgba(19, 16, 13, 0.55)',
        'glow-red': '0 0 60px -12px rgba(193, 39, 45, 0.55)',
        'glow-gold': '0 0 70px -16px rgba(201, 162, 75, 0.5)',
        'inner-line': 'inset 0 0 0 1px rgba(255,255,255,0.08)',
      },
      backgroundImage: {
        'sand-grain':
          'radial-gradient(circle at 1px 1px, rgba(120,90,50,0.12) 1px, transparent 0)',
        'night-glow':
          'radial-gradient(120% 90% at 50% 0%, rgba(201,162,75,0.18) 0%, rgba(94,27,35,0.12) 35%, rgba(11,9,7,0) 70%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'translateY(18px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        rise: {
          '0%': { transform: 'translateY(105%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'load-bar': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-26px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.06)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.9s ease-out both',
        'scale-in': 'scale-in 0.42s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        glow: 'glow 5s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        marquee: 'marquee 32s linear infinite',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
