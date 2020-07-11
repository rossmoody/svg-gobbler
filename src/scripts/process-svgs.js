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

  const results = await Promise.allSettled(svgs)

  const validResults = results.map(i => {
    if (i.status === 'fulfilled') {
      return i.value
    }
    console.log('Not fulfilled ->', i)
    return i.value
  })

  const uniqueSVGs = removeDups(validResults, 'svgString')

  const finals = uniqueSVGs.map(svg => {
    svg.fixupString()
    svg.checkForWhite()
    // Must delete reference to dom node for Firefox
    // eslint-disable-next-line
    delete svg.origEle
    return svg
  })

  return finals
}

export default processSVGs
