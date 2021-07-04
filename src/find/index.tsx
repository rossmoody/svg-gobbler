import processSVGs from './scripts/process-svgs'
import emptyState from './components/empty-state'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'start_gobbling') {
    processSVGs()
      .then((data) => {
        if (data.length === 0) {
          emptyState()
          sendResponse({ data: false })
        } else {
          sendResponse({ data })
        }
      })
      .catch(() => {
        sendResponse({ data: false })
      })
  }
  // Must return true to keep runtime port open between
  // tabs open during async promise resolution
  return true
})
