import findSVGs from './find/find-svgs'

const executeScript = async <Type>(tabId: number, func: () => Type) =>
  (
    await chrome.scripting.executeScript({
      target: { tabId },
      func,
    })
  )[0].result as Type

chrome.action.onClicked.addListener(async ({ url }) => {
  if (url?.includes('chrome://')) {
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
  } else {
    const { id } = (
      await chrome.tabs.query({ active: true, currentWindow: true })
    )[0]

    const data = await executeScript<string[]>(id!, findSVGs)
    const url = await executeScript<string>(id!, () => document.location.host)
    const location = await executeScript<string>(id!, () => document.baseURI)

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

/**
 * Show the welcome screen on install
 */
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    await chrome.tabs.create({ url: 'pages/welcome.html' })
  }
})

/**
 * Switch to Dev icon if extension is loaded as unpacked
 */
chrome.runtime.onInstalled.addListener(() => {
  const isDevMode = !('update_url' in chrome.runtime.getManifest())

  if (isDevMode)
    chrome.action.setIcon({
      path: {
        '16': 'assets/development/16.png',
        '24': 'assets/development/24.png',
        '32': 'assets/development/32.png',
      },
    })
})
