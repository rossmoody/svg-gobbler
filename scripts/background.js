/**
 * This code executes the inject script on the active tab in the browser
 */
chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript(null, { file: './scripts/inject.js' })
})
