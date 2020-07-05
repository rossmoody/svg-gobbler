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

  let finals = await Promise.all(filteredSVGs)

  finals = removeDups(finals, 'origEleString')

  return finals
}

export default findSVGs
