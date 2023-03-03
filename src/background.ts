import findSVGs from './find/find-svgs'
import loadDevIcons from './scripts/load-dev-icon'
import loadWelcomeScreen from './scripts/load-welcome-screen'

const executeScript = async <T>(tabId: number, func: () => T) =>
  (
    await chrome.scripting.executeScript({
      target: { tabId },
      func,
    })
  )[0].result as T

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
    const location = await executeScript<string>(
      id!,
      () => document.location.origin,
    )

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
