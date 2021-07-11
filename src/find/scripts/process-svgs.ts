import SVG from './svg-class'
import findSVGs from './find-svgs'
import { fetchSVGContent } from './fetch-svg'
import { dedupSVGs, convertElementRefToSVGString } from './utils'

async function processSVGs() {
  const pageElements = findSVGs()

  const validSVGs = await Promise.all(
    pageElements
      .map((ele) => new SVG(ele))
      .filter((ele) => ele.type !== 'invalid')
      .map((ele) => fetchSVGContent.call(ele))
  )

  const deduplicatedSVGs = validSVGs
    .map(convertElementRefToSVGString)
    .filter(dedupSVGs)

  // const finalSVGArray = deduplicatedSVGs.map((svg) => {
  //   svg.setClassWidthHeight()
  //   svg.setSizeString()
  //   svg.createPresentationSvg()
  //   // Must delete reference to DOM element for sending messages
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   delete svg.originalElementRef
  //   return svg
  // })

  return deduplicatedSVGs
}

export default processSVGs
