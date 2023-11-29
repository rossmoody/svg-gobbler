import type { ManifestV3Export } from '@crxjs/vite-plugin'
import packageJson from './package.json'
// @ts-ignore
import { serverEndpoint } from './src/constants/server-config'

export default <ManifestV3Export>{
  manifest_version: 3,
  name: 'SVG Gobbler',
  description: packageJson.description,
  version: packageJson.version,
  homepage_url: packageJson.homepage,
  permissions: ['activeTab', 'scripting', 'storage'],
  background: { service_worker: 'background.ts' },
  action: { default_title: 'SVG Gobbler' },
  icons: {
    16: 'assets/prod/16.png',
    32: 'assets/prod/32.png',
    48: 'assets/prod/48.png',
    128: 'assets/prod/128.png',
    256: 'assets/prod/256.png',
  },
  web_accessible_resources: [
    {
      resources: ['assets/dev/**/*.png', 'assets/prod/**/*.png'],
      matches: ['<all_urls>'],
    },
  ],
  commands: {
    _execute_action: {
      suggested_key: {
        default: 'Ctrl+Shift+G',
      },
    },
  },
  host_permissions: [serverEndpoint.svgr],
}
