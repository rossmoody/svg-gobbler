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

const filterInvalid = (svg: SVG) => svg.type !== 'invalid'

async function processSVGs() {
  const pageElements = findSVGs()

  const preliminarySVGs = await Promise.all(
    pageElements
      .map((ele) => new SVG(ele))
      .filter(filterInvalid)
      .map((ele) => fetchSVGContent.call(ele))
  )

  // this needs improved
  // The symbols can't be built until the result of the spriteHref
  // fetch call is made. This also results in exponential duplicate symbol builds.
  const validSVGs = preliminarySVGs.flatMap((svg) => {
    const hasSpriteSymbolArray = Boolean(svg.spriteSymbolArray)

    if (!hasSpriteSymbolArray) return svg

    const symbolSvgs = svg.spriteSymbolArray!.map((symbol) => {
      return new SVG(symbol)
    })

    return symbolSvgs
  })

  const processedSVGs = validSVGs
    .filter(filterInvalid)
    .map((svg) => {
      convertElementRefToSVGString.call(svg)
      return svg
    })
    .filter(dedupSVGs)
    .map((svg) => {
      removeFillNone.call(svg)
      removeClass.call(svg)
      setViewBox.call(svg)
      setWidthHeight.call(svg)
      setSize.call(svg)
      convertElementRefToSVGString.call(svg)
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
