import processSVGs from './process-svgs'

require('../styles/no-gobbler.scss')

function noGobbles() {
  const noGobbler = document.createElement('div')
  noGobbler.classList.add('gob__noGobbler')
  noGobbler.innerHTML = `😢 Drats, couldn't find any SVGs to gobble`

  document.body.insertAdjacentElement('beforebegin', noGobbler)

  setTimeout(() => {
    noGobbler.remove()
  }, 2900)
}

// eslint-disable-next-line
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'start_gobbling') {
    processSVGs().then(result => {
      if (result.length === 0) {
        noGobbles()
      } else {
        sendResponse({ complete: true, data: result })
      }
    })
    return true
  }
})
