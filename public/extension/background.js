let id = 1

chrome.browserAction.onClicked.addListener(function () {
  // Inject webpack script that finds and processes all SVGs on the page
  // Fires as soon as the extension icon is clicked
  chrome.tabs.executeScript(null, { file: './dist/gather.js' })
})

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  let targetId = null
  const viewTabUrl = chrome.extension.getURL('index.html?id=' + id++)
  chrome.tabs.create({ url: viewTabUrl }, function (tab) {
    targetId = tab.id
  })

  chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
    if (tabId != targetId || changedProps.status != 'complete') return

    chrome.tabs.onUpdated.removeListener(listener)

    const views = chrome.extension.getViews()

    for (const view of views) {
      if (view.location.href == viewTabUrl) {
        // This function is firing from the window object
        // It is being imported from the index.html script src
        view.gobble(message)
        break
      }
    }
  })

  return true
})
