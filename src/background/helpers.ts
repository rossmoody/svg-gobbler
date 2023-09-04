type ExecuteScript = <T>(tabId: number, func: () => T) => Promise<T>

/**
 * Helper function for executing scripts in the active tab
 */
export const executeScript: ExecuteScript = async (tabId, func) => {
  const result = await chrome.scripting.executeScript({
    target: { tabId },
    func,
  })

  return result[0].result
}

/**
 * Helper function for executing scripts in the active tab
 * @param url The url to open relative to the extension
 * @param data The data to send to the new tab
 */
export const createNewTab = (url: string, data: Record<string, unknown>) => {
  chrome.tabs.create({ url, active: true }, () => {
    chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
      if (changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tabId, data)
        chrome.tabs.onUpdated.removeListener(listener)
      }
    })
  })
}
