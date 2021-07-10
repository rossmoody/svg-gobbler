function setExtensionState(tabId) {
  chrome.tabs.query({ active: true, currentWindow: true }, ([result]) => {
    const url = result.url

    if (!url.includes('https://')) {
      chrome.browserAction.disable(tabId)
    }
  })
}

chrome.tabs.onActivated.addListener((tabInfo) => {
  setExtensionState(tabInfo.tabId)
})
