import type { ManifestV3Export } from '@crxjs/vite-plugin'

import packageJson from './package.json'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { serverEndpoint } from './src/constants/server-config'

export default <ManifestV3Export>{
  action: { default_title: 'SVG Gobbler' },
  background: { service_worker: 'background.ts' },
  commands: {
    _execute_action: {
      suggested_key: {
        default: 'Ctrl+Shift+G',
      },
    },
  },
  default_locale: 'en',
  description: packageJson.description,
  homepage_url: 'https://svggobbler.com',
  host_permissions: [serverEndpoint.svgr],
  icons: {
    16: 'assets/prod/16.png',
    32: 'assets/prod/32.png',
    48: 'assets/prod/48.png',
    128: 'assets/prod/128.png',
    256: 'assets/prod/256.png',
  },
  manifest_version: 3,
  name: 'SVG Gobbler',
  permissions: ['activeTab', 'scripting', 'storage'],
  version: packageJson.version,
  web_accessible_resources: [
    {
      matches: ['<all_urls>'],
      resources: ['assets/dev/**/*.png', 'assets/prod/**/*.png'],
    },
  ],
}
