/**
 * Load the development icon if the extension is running in development mode.
 */
export function loadDevIcons() {
  const isDevMode = !('update_url' in chrome.runtime.getManifest())

  if (isDevMode)
    chrome.action.setIcon({
      path: {
        '16': 'assets/development/16.png',
        '24': 'assets/development/24.png',
        '32': 'assets/development/32.png',
      },
    })
}
