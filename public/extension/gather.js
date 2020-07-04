import findSVGs from '../../src/scripts/find-svgs'

// This function gathers all the SVG content in the active tab
// and sends it as message to the new tab we create in background.js
// The object data has to be in json format to comply with security
// so we convert all values to strings when generating our class instances
async function gather() {
  const data = await findSVGs()
  chrome.runtime.sendMessage({
    message: { data },
    url: 'index.html',
  })
}

// We invoke the function because this script it injected into
// the current tab via chrome.tabs.executeScript()
gather()
