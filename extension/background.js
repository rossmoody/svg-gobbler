chrome.action.onClicked.addListener(async function systemPage({ url }) {
  if (url.includes('chrome://')) {
    chrome.tabs.create({ url: `index.html`, active: true }, () => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (changeInfo.status === 'complete') {
          chrome.tabs.sendMessage(tabId, {
            data: [],
            action: 'gobble',
            url: 'Dashboard',
          })
          chrome.tabs.onUpdated.removeListener(systemPage)
        }
      })
    })
  } else {
    const { id } = (
      await chrome.tabs.query({ active: true, currentWindow: true })
    )[0]

    const data = (
      await chrome.scripting.executeScript({
        target: { tabId: id },
        func: findSVGs,
      })
    )[0].result

    const host = (
      await chrome.scripting.executeScript({
        target: { tabId: id },
        func: () => document.location.host,
      })
    )[0].result

    const location = (
      await chrome.scripting.executeScript({
        target: { tabId: id },
        func: () => document.location.href,
      })
    )[0].result

    chrome.tabs.create({ url: `index.html`, active: true }, () => {
      chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
        if (changeInfo.status === 'complete') {
          chrome.tabs.sendMessage(tabId, {
            data,
            action: 'gobble',
            location,
            url: host,
          })
          chrome.tabs.onUpdated.removeListener(listener)
        }
      })
    })
  }
})

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    await chrome.tabs.create({ url: './welcome.html' })
  }
})

/**
 * Returns an array of unique element strings that
 * include 'svg' somewhere in the string
 */
function findSVGs() {
  function getElementsByTag(tag) {
    return [
      ...new Set(
        Array.from(document.querySelectorAll(tag))
          .map((element) => element.outerHTML)
          .filter((element) => element.includes('svg'))
      ),
    ]
  }

  const svgElements = getElementsByTag('svg')
  const objectElements = getElementsByTag('object[data*=".svg"]')
  const symbolElements = getElementsByTag('symbol')
  const imageElements = getElementsByTag('img')
  const divElements = getElementsByTag('div')
  const gElements = getElementsByTag('g')

  return [
    ...svgElements,
    ...objectElements,
    ...symbolElements,
    ...imageElements,
    ...divElements,
    ...gElements,
  ]
}
