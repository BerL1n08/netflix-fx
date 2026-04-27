import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'midnight': '#0a0f1e',
        'midnight-light': '#151d2d',
        'carrot': {
          start: '#ff7e5f',
          end: '#feb47b',
        },
      },
      backdropBlur: {
        md: '12px',
      },
      borderRadius: {
        '3xl': '24px',
      },
      boxShadow: {
        glow: '0 0 30px rgba(255, 126, 95, 0.4)',
        'glow-lg': '0 0 50px rgba(255, 126, 95, 0.5)',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      backgroundImage: {
        'mesh-gradient': `linear-gradient(45deg, #0a0f1e 0%, #1a2847 25%, #0f1f3a 50%, #0a0f1e 75%, #1a2847 100%)`,
      },
    },
  },
  plugins: [],
}

export default config
