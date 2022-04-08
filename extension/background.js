chrome.action.onClicked.addListener(async () => {
  await chrome.tabs.create({ url: './index.html' })
})

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: './welcome.html' })
  }
})
