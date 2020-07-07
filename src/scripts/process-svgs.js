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
    // Runs each element through class creation
    // Clones the original element
    .map(ele => new SVG(ele))
    // Determines what type of SVG it is
    // Also if it has a url to fetch
    .map(ele => ele.determineType())
    // Filters out any elements that don't have
    // a type property on the class
    .filter(ele => ele.type)
    .map(ele => ele.buildSpriteString())
    // Determines size of orig ele
    .map(ele => ele.determineSize())
    .map(async svg => {
      const result = await svg.fetchSvg()
      result.checkForWhite()
      return result
    })

  const uniqueSvgs = Promise.all(filteredSVGs).then(result => {
    return removeDups(result, 'svgString')
  })

  console.log(uniqueSvgs)
  return uniqueSvgs
}

export default processSVGs
