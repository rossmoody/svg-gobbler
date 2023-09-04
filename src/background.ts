import {
  executeScript,
  findSVGs,
  loadDevIcons,
  loadWelcomeScreen,
} from './background-scripts'

chrome.action.onClicked.addListener(async ({ url }) => {
  const isSystemPage = url?.includes('chrome://')

  if (isSystemPage) {
    chrome.tabs.create({ url: `./pages/index.html`, active: true }, () => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (changeInfo.status === 'complete') {
          chrome.tabs.sendMessage(tabId, {
            data: [],
            action: 'gobble',
            url: 'Dashboard',
          })

          chrome.tabs.onUpdated.removeListener(listener)
        }
      })
    })

    return
  }

  const { id } = (
    await chrome.tabs.query({ active: true, currentWindow: true })
  )[0]

  if (id) {
    const data = await executeScript(id, findSVGs)
    const url = await executeScript(id, () => document.location.host)
    const location = await executeScript(id, () => document.location.origin)

    chrome.tabs.create({ url: `./pages/index.html`, active: true }, () => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (changeInfo.status === 'complete') {
          chrome.tabs.sendMessage(tabId, {
            data,
            action: 'gobble',
            location,
            url,
          })

          chrome.tabs.onUpdated.removeListener(listener)
        }
      })
    })
  }
})

loadWelcomeScreen()
loadDevIcons()
