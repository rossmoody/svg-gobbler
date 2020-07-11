import SVG from './create-svg'
import findSVGs from './find-svgs'

function removeDups(arr, comp) {
  const unique = arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e])
    .map(e => arr[e])

  return unique
}

function processSVGs() {
  const pageEles = findSVGs()
  const svgs = pageEles
    .map(ele => new SVG(ele))
    .map(ele => ele.determineType())
    .filter(ele => ele.type)
    .map(ele => ele.buildSpriteString())
    .map(ele => ele.determineSize())
    .map(async svg => {
      const fetch = await svg.fetchSvg()
      fetch.fixupString()
      fetch.checkForWhite()
      return fetch
    })

  return Promise.all(svgs).then(result => {
    return removeDups(result, 'svgString')
  })
}

export default processSVGs
