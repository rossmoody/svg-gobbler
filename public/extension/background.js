chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.executeScript(null, { file: './dist/gather.js' })
})

let id = 0

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const viewTabUrl = chrome.extension.getURL('index.html?id=' + id++)
  let targetId = null

  chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
    if (tabId != targetId || changedProps.status != 'complete') return
    const views = chrome.extension.getViews()
    const data = request.message.data

    for (const view of views) {
      if (view.location.href == viewTabUrl) {
        view.gobble(data)
        break
      }
    }
  })

  if (request.message.type === 'open_new_tab') {
    chrome.tabs.create({ url: viewTabUrl }, function (tab) {
      targetId = tab.id
    })
  }
})
