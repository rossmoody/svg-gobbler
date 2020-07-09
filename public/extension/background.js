let id = 1
let viewTabUrl = null

function buildTab(data) {
  chrome.tabs.create({ url: viewTabUrl })

  chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
    if (changedProps.status != 'complete') return

    chrome.tabs.onUpdated.removeListener(listener)

    var views = chrome.extension.getViews()

    for (const view of views) {
      if (view.location.href == viewTabUrl) {
        view.gobble(data)
        break
      }
    }
  })
}

function sendMessagePromise(tabId, item) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, item, response => {
      if (response.complete) {
        buildTab(response.data)
        resolve()
      } else {
        reject('Something wrong')
      }
    })
  })
}

chrome.browserAction.onClicked.addListener(function () {
  viewTabUrl = chrome.runtime.getURL('index.html?id=' + id++)

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    sendMessagePromise(tabs[0].id, {
      message: 'start_gobbling',
    })
  })
})
