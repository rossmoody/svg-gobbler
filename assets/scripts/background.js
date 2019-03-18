/**
 * This code executes the inject script on the active tab in the browser
 * via clicking the extension icon. Defaults to current tab
 */

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.executeScript(null, { file: './assets/scripts/index.js' })
  chrome.tabs.insertCSS(null, { file: './assets/styles/style.css' })
})
