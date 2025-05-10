import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
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
  legacy: {
    // See https://github.com/crxjs/chrome-extension-tools/issues/971 for more info
    skipWebSocketTokenCheck: true,
  },
  plugins: [react(), crx({ manifest })],
  resolve: {
    alias: {
      scripts: path.resolve(__dirname, 'scripts'),
      src: path.resolve(__dirname, 'src'),
    },
  },
  server: {
    cors: {
      origin: [/chrome-extension:\/\//],
    },
  },
})
