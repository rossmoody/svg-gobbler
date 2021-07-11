import processSVGs from './scripts/process-svgs'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'start_gobbling') {
    processSVGs()
      .then((data) => {
        if (data.length === 0) {
          // eslint-disable-next-line no-alert
          alert('No available SVGs to gobble')
          sendResponse({ data: false })
        } else {
          // sendResponse({ data })
          data.forEach((svg) => if(svg.cors) console.log(svg.originalElementRef))
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
