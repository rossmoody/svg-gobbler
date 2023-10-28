import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import manifest from './manifest.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  // Server error: https://github.com/crxjs/chrome-extension-tools/issues/696
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
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
})
