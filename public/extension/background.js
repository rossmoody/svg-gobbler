chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.executeScript(null, { file: './dist/index.js' })
  chrome.tabs.insertCSS(null, { file: './dist/style.css' })
})
