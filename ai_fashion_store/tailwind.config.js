/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', /* transparent black/white */
        input: 'var(--color-input)', /* white/slate-800 */
        ring: 'var(--color-ring)', /* blue-500/blue-400 */
        background: 'var(--color-background)', /* gray-50/slate-900 */
        foreground: 'var(--color-foreground)', /* gray-800/slate-100 */
        primary: {
          DEFAULT: 'var(--color-primary)', /* blue-500/blue-400 */
          foreground: 'var(--color-primary-foreground)', /* white/slate-800 */
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', /* violet-500/violet-400 */
          foreground: 'var(--color-secondary-foreground)', /* white/slate-800 */
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', /* red-500/red-400 */
          foreground: 'var(--color-destructive-foreground)', /* white/slate-800 */
        },
        muted: {
          DEFAULT: 'var(--color-muted)', /* gray-100/slate-700 */
          foreground: 'var(--color-muted-foreground)', /* gray-500/slate-400 */
        },
        accent: {
          DEFAULT: 'var(--color-accent)', /* cyan-500/cyan-400 */
          foreground: 'var(--color-accent-foreground)', /* white/slate-800 */
        },
        popover: {
          DEFAULT: 'var(--color-popover)', /* white/slate-800 */
          foreground: 'var(--color-popover-foreground)', /* gray-800/slate-100 */
        },
        card: {
          DEFAULT: 'var(--color-card)', /* white/slate-800 */
          foreground: 'var(--color-card-foreground)', /* gray-800/slate-100 */
        },
        success: {
          DEFAULT: 'var(--color-success)', /* emerald-500/emerald-400 */
          foreground: 'var(--color-success-foreground)', /* white/slate-800 */
        },
        warning: {
          DEFAULT: 'var(--color-warning)', /* amber-500/amber-400 */
          foreground: 'var(--color-warning-foreground)', /* white/slate-800 */
        },
        error: {
          DEFAULT: 'var(--color-error)', /* red-500/red-400 */
          foreground: 'var(--color-error-foreground)', /* white/slate-800 */
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
        'floating': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'fade-in-up': 'fadeInUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      transitionTimingFunction: {
        'out-cubic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}