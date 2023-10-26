/**
 * Awaits the loading of a newly created tab and return the tab config.
 * @param url The url to open relative to the extension. Defaults to index.html.
 */
export function createNewTab(url = './index.html'): Promise<chrome.tabs.Tab> {
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
