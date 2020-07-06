import SVG from './process-svgs'

function removeDups(arr, comp) {
  const unique = arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e])
    .map(e => arr[e])

  return unique
}

async function findSVGs() {
  const svgTags = Array.from(window.document.querySelectorAll('svg'))
  const objDatas = Array.from(
    window.document.querySelectorAll('object[data*=".svg"]')
  )
  const imgSrcs = Array.from(
    window.document.querySelectorAll('img[src*=".svg"]')
  )
  const pageDivs = Array.from(window.document.querySelectorAll('div'))

  const pageSVGs = [...svgTags, ...imgSrcs, ...objDatas, ...pageDivs]

  const filteredSVGs = pageSVGs
    .map(ele => new SVG(ele))
    .map(ele => ele.determineType())
    .filter(ele => ele.type)
    .map(ele => ele.serialize())
    .map(ele => ele.determineSize())
    .map(async svg => {
      const result = await svg.fetchSvg()
      result.checkForWhite()
      return result
    })

  await Promise.all(filteredSVGs)
    .then(result => {
      return removeDups(result, 'origEleString')
    })
    .then(result => {
      // console.log(result)

      // I spent two days trying to get asynchronous functions to work in chrome.tabs.sendMessage
      // It's very difficult and I'm resorting to timeout for now
      // https://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
      setTimeout(() => {
        // eslint-disable-next-line
        chrome.runtime.sendMessage(result)
      }, 100)
    })
}

findSVGs()
