import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D0D0D', // Premium off-black background
        foreground: '#F5F5F7', // Elegant off-white text
        accent: {
          gold: {
            DEFAULT: '#D4AF37', // Luxury gold
            hover: '#F3E5AB', // Soft glowing gold on hover
            dark: '#AA7C11', // Deep bronze/gold
            light: '#E5C04A',
          },
          charcoal: {
            DEFAULT: '#121212', // Off-Blacks
            medium: '#1A1A1A',  // Deep Charcoals
            light: '#242424',   // Light Charcoal for hover/cards
            border: '#2A2A2A',  // Subtle luxurious border
          }
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(90deg, #AA7C11 0%, #D4AF37 50%, #AA7C11 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(212, 175, 55, 0.15)',
        'gold-glow-hover': '0 0 25px rgba(212, 175, 55, 0.3)',
      }
    },
  },
  plugins: [],
}
export default config
