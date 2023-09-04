import { findSVGs } from './find-svgs'
import { createNewTab, executeScript } from './helpers'

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

      createNewTab('./pages/index.html', {
        data,
        action: 'gobble',
        location,
        url,
      })
    }
  })
}
