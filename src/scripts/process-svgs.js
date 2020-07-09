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
  const filteredSVGs = pageEles
    .map(ele => new SVG(ele))
    .map(ele => ele.determineType())
    .filter(ele => ele.type)
    .map(ele => ele.buildSpriteString())
    .map(ele => ele.determineSize())
    .map(async svg => {
      const result = await svg.fetchSvg()
      return result
    })

  const data = Promise.all(filteredSVGs).then(result => {
    const finals = result.map(svg => {
      svg.fixupString()
      svg.checkForWhite()
      // eslint-disable-next-line
      delete svg.origEle
      return svg
    })

    return removeDups(finals, 'svgString')
  })

  return data
}

export default processSVGs
