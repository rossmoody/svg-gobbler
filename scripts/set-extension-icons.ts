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
      },
    })
  }
}
