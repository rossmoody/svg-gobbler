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

async function processSVGs() {
  const pageEles = findSVGs()

  const svgs = pageEles
    .map(ele => new SVG(ele))
    .map(ele => ele.determineType())
    .filter(ele => ele.type)
    .map(ele => ele.buildSpriteString())
    .map(ele => ele.determineSize())
    .map(ele => ele.fetchSvg())

  const promiseResults = await Promise.all(svgs).catch(console.log)

  const uniqueSVGs = removeDups(promiseResults, 'svgString')

  const finals = uniqueSVGs.map(svg => {
    svg.fixupString()
    svg.checkForWhite()
    return svg
  })

  return finals
}

export default processSVGs
