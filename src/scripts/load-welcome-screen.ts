/**
 * If the extension is installed for the first time, open the welcome page.
 */
export default function loadWelcomeScreen() {
  chrome.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === 'install') {
      await chrome.tabs.create({ url: 'pages/welcome.html' })
    }
  })
}
