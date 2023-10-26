/**
 * Initializes SVG Gobbler conditionally based on the type of page the user is
 * currently on. Responsible for getting data from the active tab and sending
 * it to the content script.
 */
export function launchSvgGobbler() {
  chrome.action.onClicked.addListener(async ({ url }) => {
    if (url?.includes('chrome://')) {
      // It's a systems or settings page. Launch empty
      return chrome.tabs.create({ url: './index.html', active: true })
    }

    try {
      // Create a new tab with the SVG Gobbler page
      const tab = await createNewTab()
      chrome.tabs.sendMessage(tab.id!, { type: 'SVG_GOBBLER_INIT' })
    } catch (error) {
      console.log('Error launching SVG Gobbler', error)
    }
  })
}

/**
 * Awaits the loading of a newly created tab and return the tab information.
 * @param url The url to open relative to the extension. Defaults to the index page.
 */
function createNewTab(url: string = './index.html'): Promise<chrome.tabs.Tab> {
  return new Promise((resolve) => {
    chrome.tabs.create({ url, active: true }, (tab) => {
      const listener = (updatedTabId, changeInfo, updatedTab) => {
        if (
          tab.id &&
          updatedTabId === tab.id &&
          changeInfo.status === 'complete' &&
          updatedTab.status === 'complete'
        ) {
          chrome.tabs.onUpdated.removeListener(listener)
          resolve(updatedTab)
        }
      }

      chrome.tabs.onUpdated.addListener(listener)
    })
  })
}
