import SVG from './svg-class'
import findSVGs from './find-svgs'
import { fetchSVGContent } from './fetch-svg'
import {
  dedupSVGs,
  setWidthHeight,
  convertElementRefToSVGString,
  setViewBox,
  setSize,
  removeFillNone,
  removeClass,
  createPresentationSvg,
} from './utils'

async function processSVGs() {
  const pageElements = findSVGs()

  const validSVGs = await Promise.all(
    pageElements
      .map((ele) => new SVG(ele))
      .filter((ele) => ele.type !== 'invalid')
      .map((ele) => fetchSVGContent.call(ele))
  )

  const processedSVGs = validSVGs
    .map(convertElementRefToSVGString)
    .filter(dedupSVGs)
    .map((svg) => {
      removeFillNone.call(svg)
      removeClass.call(svg)
      setViewBox.call(svg)
      setWidthHeight.call(svg)
      setSize.call(svg)
      createPresentationSvg.call(svg)
      // Must delete reference to DOM Node for sending messages
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete svg.originalElementRef
      return svg
    })

  return processedSVGs
}

export default processSVGs
