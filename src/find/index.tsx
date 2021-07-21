import processSVGs from './scripts/process-svgs'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'start_gobbling') {
    processSVGs()
      .then((svgData) => {
        if (svgData.length === 0) {
          sendResponse({
            data: 'empty',
          })
        } else {
          sendResponse({
            data: {
              location: document.location.host,
              content: svgData,
            },
          })
        }
      })
      .catch(() => {
        sendResponse({
          data: 'empty',
        })
      })
  }
  // * Must return true to keep runtime port open between
  // * tabs open during async promise resolution
  return true
})
