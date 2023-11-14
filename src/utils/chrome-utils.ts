class Chrome {
  /**
   * Awaits the loading of a newly created tab and return the tab config.
   * @param url The url to open relative to the extension. Defaults to index.html.
   */
  createNewTab(url = 'index.html'): Promise<chrome.tabs.Tab> {
    return new Promise((resolve) => {
      chrome.tabs.create({ url, active: true }, (tab) => {
        const listener = (
          updatedTabId: number,
          changeInfo: chrome.tabs.TabChangeInfo,
          updatedTab: chrome.tabs.Tab,
        ) => {
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

  /**
   * Helper function for executing scripts in the active tab.
   * @param tabId - The ID of the tab where the script should be executed.
   * @param callBack - The callback function to execute in the tab.
   * @returns A Promise that resolves to the result of the callback.
   */
  async executeScript<T>(tabId: number, callBack: () => T): Promise<T> {
    const results = await chrome.scripting.executeScript({
      target: { tabId },
      func: callBack,
    })

    if (chrome.runtime.lastError) {
      throw new Error(chrome.runtime.lastError.message)
    }

    if (!results || results.length === 0) {
      throw new Error('Script execution returned no result.')
    }

    return results[0].result as T
  }

  /**
   * Gets the active tab to inject scripts into.
   * @returns The ID of the active tab
   */
  async getActiveTab() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
    return tabs[0]
  }
}

export default new Chrome()
