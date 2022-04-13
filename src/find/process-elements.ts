import fetchSVGContent from './async-operations'
import process from './process-svg'
import SVG from './svg-class'

async function processElements(strings: string[]) {
  const parser = new DOMParser()
  const pageElements = strings.map((string) => {
    const doc = parser.parseFromString(string, 'image/svg+xml')
    const error = doc.querySelector('parsererror')

    if (error) {
      const newDoc = parser.parseFromString(string, 'text/html')
      return newDoc.body.firstElementChild
    } else {
      return doc.firstElementChild
    }
  }) as Element[]

  const preliminarySVGs = await Promise.all(
    pageElements
      .map((ele) => new SVG(ele))
      .filter(process.filterInvalid)
      .map((ele) => {
        return fetchSVGContent.call(ele)
      })
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
    }) as SVG[]
}

export default processElements
