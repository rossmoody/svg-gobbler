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
    exclude: ['**/node_modules/**', '**/dist/**'],
    include: ['*.test.ts', 'src/**/*.test.{ts,tsx}', 'server/**/*.test.ts'],
    restoreMocks: true,
  },
})
