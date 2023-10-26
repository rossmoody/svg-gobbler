/**
 * Load the development icon if the extension is running in development mode.
 */
export function setExtensionIcons() {
  if (!('update_url' in chrome.runtime.getManifest())) {
    // The extension is running as an unpacked extension
    chrome.action.setIcon({
      path: {
        '16': 'assets/dev/16.png',
        '24': 'assets/dev/24.png',
        '32': 'assets/dev/32.png',
      },
    })
  } else {
    // The extension is running as a packed (installed) extension
    chrome.action.setIcon({
      path: {
        '16': 'assets/prod/16.png',
        '24': 'assets/prod/24.png',
        '32': 'assets/prod/32.png',
        '48': 'assets/prod/48.png',
        '64': 'assets/prod/64.png',
        '128': 'assets/prod/128.png',
        '256': 'assets/prod/256.png',
        '300': 'assets/prod/300.png',
      },
    })
  }
}
