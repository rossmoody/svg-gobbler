function findSVGs() {
  function getElementsByTag(tag) {
    const elements = Array.from(document.querySelectorAll(tag))
    return elements.map((element) => element.outerHTML)
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

chrome.action.onClicked.addListener(async () => {
  const { id, url } = (
    await chrome.tabs.query({ active: true, currentWindow: true })
  )[0]

  const data = (
    await chrome.scripting.executeScript({
      target: { tabId: id },
      func: findSVGs,
    })
  )[0].result

  chrome.tabs.create({ url: `./index.html` }, () => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete') {
        chrome.tabs.sendMessage(tab.id, { data, action: 'gobble', url })
      }
    })
  })
})

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({ url: './welcome.html' })
  }
})
