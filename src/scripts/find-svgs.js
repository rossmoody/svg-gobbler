import SVG from './process-svgs'

function removeDups(arr, comp) {
  const unique = arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e])
    .map(e => arr[e])

  return unique
}

function noGobbles() {
  const doc = document.querySelector('body')
  const noGobbler = document.createElement('div')
  noGobbler.classList.add('gob__noGobbler')
  noGobbler.innerHTML = `😢 Drats, no SVGs to gobble `
  doc.insertAdjacentElement('beforebegin', noGobbler)
  setTimeout(() => {
    noGobbler.remove()
  }, 3000)
}

function findSVGs() {
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

  Promise.all(filteredSVGs)
    .then(result => {
      return removeDups(result, 'origEleString')
    })
    .then(result => {
      if (result.length === 0) {
        noGobbles()
      } else {
        setTimeout(() => {
          // eslint-disable-next-line
          chrome.runtime.sendMessage(result)
        }, 100)
      }
    })
}

findSVGs()
