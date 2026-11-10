import path from 'node:path'
import { defineConfig } from 'vitest/config'

// Kept separate from vite.config.ts so tests don't load the extension (crx) plugin.
export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    restoreMocks: true,
  },
})
