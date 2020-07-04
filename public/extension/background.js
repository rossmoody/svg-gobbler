chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.executeScript(null, { file: './dist/gather.js' })
})

let id = 0

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const viewTabUrl = chrome.extension.getURL('index.html?id=' + id++)
  let targetId = null

  const data = request.message.data

  chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
    if (tabId != targetId || changedProps.status != 'complete') return

    chrome.tabs.onUpdated.removeListener(listener)

    const views = chrome.extension.getViews()
    for (const view of views) {
      if (view.location.href == viewTabUrl) {
        view.gobble(data)
        break
      }
    }
  })

  if (data.length > 0) {
    chrome.tabs.create({ url: viewTabUrl }, function (tab) {
      targetId = tab.id
    })
  }
})
