import findSVGs from '../../src/scripts/find-svgs'

// This fires in the active tab
// findSVGs().then(data => {
//   console.log(data)
//   chrome.runtime.sendMessage({
//     message: { data },
//     url: 'index.html',
//   })
// })

const svgs = findSVGs()
console.log(svgs)
chrome.runtime.sendMessage({
  message: { type: 'open_new_tab', data: svgs },
  url: 'index.html',
})
