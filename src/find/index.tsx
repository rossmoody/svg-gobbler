import processSVGs from './scripts/process-svgs'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'start_gobbling') {
    processSVGs()
      .then((svgData) => {
        if (svgData.length === 0) {
          sendResponse({
            data: {
              content: 'empty',
            },
          })
        } else {
          sendResponse({
            data: {
              content: svgData,
              location: document.location.host,
            },
          })
        }
      })
      .catch(() => {
        sendResponse({
          data: {
            content: 'empty',
          },
        })
      })
  }
  // * Must return true to keep runtime port open between
  // * tabs open during async promise resolution
  return true
})
