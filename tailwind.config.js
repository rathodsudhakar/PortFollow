/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        retro: ['"Press Start 2P"', 'monospace'],
      },
      colors: {
        theme: {
          desktop: 'var(--color-desktop-bg)',
          window: 'var(--color-window-bg)',
          card: 'var(--color-card-bg)',
          border: 'var(--color-border)',
          text: 'var(--color-text-main)',
          muted: 'var(--color-text-muted)',
          accent: 'var(--color-accent-primary)',
          secondary: 'var(--color-accent-secondary)',
          purple: 'var(--color-accent-purple)',
          magenta: 'var(--color-accent-magenta)',
          green: 'var(--color-terminal-green)',
          gold: 'var(--color-accent-gold)',
          taskbar: 'var(--color-taskbar-bg)',
          titleActive: 'var(--color-titlebar-active)',
          titleActiveText: 'var(--color-titlebar-active-text)',
          titleInactive: 'var(--color-titlebar-inactive)',
          titleInactiveText: 'var(--color-titlebar-inactive-text)',
          btnSurface: 'var(--color-btn-surface)',
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 15px rgba(0, 229, 255, 0.35)',
        'neon-purple': '0 0 15px rgba(139, 92, 246, 0.35)',
        'neon-magenta': '0 0 15px rgba(255, 46, 147, 0.35)',
        'win98': 'inset 1px 1px #fff, inset -1px -1px #000, 1px 1px #000',
        'win98-in': 'inset 1px 1px #000, inset -1px -1px #fff',
        'os-window': 'var(--window-shadow)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s step-start infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
