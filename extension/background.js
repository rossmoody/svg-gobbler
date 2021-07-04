let id = 1

function buildTab(data) {
  const url = chrome.runtime.getURL('index.html?id=' + id++)

  chrome.tabs.create({ url: url })

  chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
    if (changedProps.status != 'complete') return
    chrome.tabs.onUpdated.removeListener(listener)

    chrome.tabs.sendMessage(tabId, { data });
  })
}

function sendMessagePromise(tabId, item) {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, item, response => {
      resolve(response.data)
    })
  })
}

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    sendMessagePromise(tabs[0].id, {
      message: 'start_gobbling',
    })
      .then(results => {
        if (results)
          buildTab(results)
      })
      .catch(console.log)
  })
})
