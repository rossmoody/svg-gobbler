import SVGClass from './create-svg'
import findSVGs from './find-svgs'

async function processSVGs() {
  const pageElements = findSVGs()

  const initialSvgs = pageElements
    .map((ele) => new SVGClass(ele))
    .filter((ele) => ele.isValidSvg())

  const promiseResults = await Promise.all(
    initialSvgs.map((ele) => {
      try {
        return ele.fetchSvg()
      } catch (error) {
        return ele
      }
    })
  )

  const uniqueSVGs = promiseResults.filter((svg, index, originalArray) => {
    const stringToCompare = svg.svgString

    const firstIndexFound = originalArray.findIndex(
      (currentSvg) => currentSvg.svgString === stringToCompare
    )

    return firstIndexFound === index
  })

  const finals = uniqueSVGs.map((svg) => {
    svg.createPresentationSvg()
    // Must delete reference to dom node for sending messages
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete svg.originalElementRef
    return svg
  })

  return finals
}

export default processSVGs
