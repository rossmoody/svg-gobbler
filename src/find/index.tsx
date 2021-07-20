import processSVGs from './scripts/process-svgs'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'start_gobbling') {
    processSVGs()
      .then((data) => {
        if (data.length === 0) {
          sendResponse({ data: 'empty' })
        } else {
          sendResponse({ data })
        }
      })
      .catch(() => {
        sendResponse({ data: 'empty' })
      })
  }
  // Must return true to keep runtime port open between
  // tabs open during async promise resolution
  return true
})
