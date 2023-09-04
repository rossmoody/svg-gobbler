import { executeScript } from './execute-script'
import { findSVGs } from './find-svgs'

export const handleWebPage = () => {
  chrome.action.onClicked.addListener(async ({ url }) => {
    // Guard against clicking on the extension icon while on a system page.
    if (url?.includes('chrome://')) return

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
}
