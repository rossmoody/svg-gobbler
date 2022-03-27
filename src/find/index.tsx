import processElements from './scripts/process-elements'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const isValidRequest =
    request.message === 'start_gobbling' && document.readyState === 'complete'

  if (isValidRequest) {
    processElements()
      .then((svgData) => {
        const isEmpty = svgData.length === 0

        if (isEmpty)
          return sendResponse({
            data: 'empty',
          })

        return sendResponse({
          data: {
            location: document.location.host,
            content: svgData,
          },
        })
      })
      .catch(() => {
        sendResponse({
          data: 'empty',
        })
      })
  }
  // Must return true to keep runtime port open between
  // tabs open during async promise resolution
  return true
})
