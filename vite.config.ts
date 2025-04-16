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
      scripts: path.resolve(new URL('.', import.meta.url).pathname, 'scripts'),
      src: path.resolve(new URL('.', import.meta.url).pathname, 'src'),
    },
  },
  server: {
    cors: {
      origin: [
        // See https://github.com/crxjs/chrome-extension-tools/issues/971 for more info
        /chrome-extension:\/\//,
      ],
    },
  },
})
