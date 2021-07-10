import SVGClass from './create-svg'
import findSVGs from './find-svgs'

async function processSVGs() {
  const initialSvgs = findSVGs()
    .map((ele) => new SVGClass(ele))
    .filter((ele) => ele.isValidSvg())

  const promiseResults = await Promise.all(
    initialSvgs.map((ele) => {
      try {
        return ele.setSvgString()
      } catch (error) {
        return ele
      }
    })
  )

  const deduplicatedSVGs = promiseResults.filter(
    (svg, index, originalArray) => {
      const stringToCompare = svg.svgString

      const firstIndexFound = originalArray.findIndex(
        (currentSvg) => currentSvg.svgString === stringToCompare
      )

      return firstIndexFound === index
    }
  )

  const finalSVGArray = deduplicatedSVGs.map((svg) => {
    svg.setClassWidthHeight()
    svg.setSizeString()
    svg.createPresentationSvg()
    // Must delete reference to DOM element for sending messages
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete svg.originalElementRef
    return svg
  })

  return finalSVGArray
}

export default processSVGs
