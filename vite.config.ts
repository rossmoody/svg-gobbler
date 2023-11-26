import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { defineConfig } from 'vite'
import manifest from './manifest.json'
import { serverEndpoint } from './src/constants/server-config'

export default defineConfig({
  plugins: [react(), crx({ manifest: { ...manifest, host_permissions: [serverEndpoint.svgr] } })],
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
  resolve: {
    alias: {
      scripts: path.resolve(__dirname, 'scripts'),
      src: path.resolve(__dirname, 'src'),
    },
  },
})
