import headlessPlugin from '@headlessui/tailwindcss'
import formsPlugin from '@tailwindcss/forms'
import scrollbarPlugin from 'tailwind-scrollbar'
import radixPlugin from 'tailwindcss-radix'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  plugins: [formsPlugin, headlessPlugin, radixPlugin, scrollbarPlugin],
  theme: {
    extend: {
      animation: {
        'slide-down-fade': 'slide-down-fade 200ms ease-in-out',
        'slide-left-fade': 'slide-left-fade 200ms ease-in-out',
        'slide-right-fade': 'slide-right-fade 200ms ease-in-out',
        'slide-up-fade': 'slide-up-fade 200ms ease-in-out',
        'toast-hide': 'toast-hide 100ms ease-in forwards',
        'toast-slide-in-bottom': 'toast-slide-in-bottom 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'toast-slide-in-right': 'toast-slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'toast-swipe-out-x': 'toast-swipe-out-x 100ms ease-out forwards',
        'toast-swipe-out-y': 'toast-swipe-out-y 100ms ease-out forwards',
      },
      keyframes: {
        'slide-down-fade': {
          '0%': { opacity: 0, transform: 'translateY(-2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-left-fade': {
          '0%': { opacity: 0, transform: 'translateX(2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        'slide-right-fade': {
          '0%': { opacity: 0, transform: 'translateX(-2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        'slide-up-fade': {
          '0%': { opacity: 0, transform: 'translateY(2px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'toast-hide': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'toast-slide-in-bottom': {
          '0%': { transform: `translateY(calc(100% + 1rem))` },
          '100%': { transform: 'translateY(0)' },
        },
        'toast-slide-in-right': {
          '0%': { transform: `translateX(calc(100% + 1rem))` },
          '100%': { transform: 'translateX(0)' },
        },
        'toast-swipe-out-x': {
          '0%': { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          '100%': {
            transform: `translateX(calc(100% + 1rem))`,
          },
        },
        'toast-swipe-out-y': {
          '0%': { transform: 'translateY(var(--radix-toast-swipe-end-y))' },
          '100%': {
            transform: `translateY(calc(100% + 1rem))`,
          },
        },
      },
    },
  },
}
