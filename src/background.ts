const executeScript = async <Type>(tabId: number, func: () => Type) =>
  (
    await chrome.scripting.executeScript({
      target: { tabId },
      func,
    })
  )[0].result

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

    const data = await executeScript(id!, findSVGs)
    const host = await executeScript(id!, () => document.location.host)
    const location = await executeScript(id!, () => document.location.href)

    chrome.tabs.create({ url: `./pages/index.html`, active: true }, () => {
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
    await chrome.tabs.create({ url: './pages/welcome.html' })
  }
})

/**
 * Returns an array of unique element strings that
 * include 'svg' somewhere in the string
 */
function findSVGs() {
  const getElementsByTag = (tag: string) =>
    Array.from(document.querySelectorAll(tag))
      .map((element) => element.outerHTML)
      .filter((element) => element.includes('svg'))

  const svgElements = getElementsByTag('svg')
  const objectElements = getElementsByTag('object[data*=".svg"]')
  const symbolElements = getElementsByTag('symbol')
  const imageElements = getElementsByTag('img')
  const gElements = getElementsByTag('g')

  return [
    ...new Set([
      ...svgElements,
      ...objectElements,
      ...symbolElements,
      ...imageElements,
      ...gElements,
    ]),
  ]
}
