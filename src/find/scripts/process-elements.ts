import SVG from './svg-class'
import findSVGs from './gather-elements'
import process from './process-svg'
import fetchSVGContent from './async-operations'

async function processElements() {
  const pageElements = findSVGs()

  const preliminarySVGs = await Promise.all(
    pageElements
      .map((ele) => new SVG(ele))
      .filter(process.filterInvalid)
      .map((ele) => fetchSVGContent.call(ele))
  )

  return preliminarySVGs
    .flatMap((svg) => process.processSvgSymbolsFromFetchCall.call(svg))
    .filter(process.filterInvalid)
    .map((svg) => {
      process.convertElementRefToSVGString.call(svg)
      return svg
    })
    .filter(process.dedupSVGs)
    .map((svg) => {
      process.removeFillNone.call(svg)
      process.removeClass.call(svg)
      process.setViewBox.call(svg)
      process.setWidthHeight.call(svg)
      process.setSize.call(svg)
      process.convertElementRefToSVGString.call(svg)
      process.createPresentationSvg.call(svg)
      process.hasWhiteFill.call(svg)
      return process.removeDomNodes.call(svg)
    })
}

export default processElements
