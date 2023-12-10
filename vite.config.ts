import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'

import manifest from './manifest.config'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        onboarding: 'onboarding.html',
      },
      onwarn: (warning, warn) => {
        if (warning.code === 'FILE_NAME_CONFLICT') return
        warn(warning)
      },
    },
  },
  plugins: [react(), crx({ manifest })],
  resolve: {
    alias: {
      scripts: path.resolve(__dirname, 'scripts'),
      src: path.resolve(__dirname, 'src'),
    },
  },
  // Server error: https://github.com/crxjs/chrome-extension-tools/issues/696
  server: {
    hmr: {
      port: 5173,
    },
    port: 5173,
    strictPort: true,
  },
})
