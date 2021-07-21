function checkIfSystemTab(tab) {
  let result = false

  const currentTabUrl = tab.url
  const isFirefoxSystemPage = currentTabUrl.includes('about:')
  const isChromeSystemPage = currentTabUrl.includes('chrome:')

  if (isChromeSystemPage || isFirefoxSystemPage) result = true

  return result
}

function buildTab(message) {
  chrome.tabs.create({ url: `index.html?id=${Math.random()}` })

  chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
    if (changedProps.status !== 'complete') return
    chrome.tabs.onUpdated.removeListener(listener)

    chrome.tabs.sendMessage(tabId, { data: message })
  })
}

function sendMessagePromise(tabId, item) {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, item, (response) => {
      if (response) resolve(response.data)
    })
  })
}

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0]
    const isSystemPage = checkIfSystemTab(currentTab)

    if (isSystemPage) return buildTab({ content: 'system' })

    sendMessagePromise(currentTab.id, {
      message: 'start_gobbling',
    })
      .then((data) => {
        if (data === 'empty') {
          buildTab({ content: 'empty' })
        } else {
          buildTab(data)
        }
      })
      .catch(() => {
        buildTab({ content: 'system' })
      })
  })
})
