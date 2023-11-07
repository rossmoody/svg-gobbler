import headlessPlugin from '@headlessui/tailwindcss'
import formsPlugin from '@tailwindcss/forms'
import radixPlugin from 'tailwindcss-radix'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  plugins: [headlessPlugin(), formsPlugin, radixPlugin()],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        // Tooltip
        'slide-up-fade': {
          '0%': { opacity: 0, transform: 'translateY(2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-right-fade': {
          '0%': { opacity: 0, transform: 'translateX(-2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        'slide-down-fade': {
          '0%': { opacity: 0, transform: 'translateY(-2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-left-fade': {
          '0%': { opacity: 0, transform: 'translateX(2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        // Tooltip
        'slide-up-fade': 'slide-up-fade 200ms ease-in-out',
        'slide-right-fade': 'slide-right-fade 200ms ease-in-out',
        'slide-down-fade': 'slide-down-fade 200ms ease-in-out',
        'slide-left-fade': 'slide-left-fade 200ms ease-in-out',
      },
    },
  },
}
