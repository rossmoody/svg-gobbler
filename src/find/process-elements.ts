import fetchSVGContent from './async-operations'
import process from './process-svg'
import SVG from './svg-class'

async function processElements(strings: string[], location: string) {
  const parser = new DOMParser()
  const results = [] as Element[]

  strings.forEach((string) => {
    const { body } = parser.parseFromString(string, 'text/html')
    if (body.firstElementChild) results.push(body.firstElementChild)
  })

  const preliminarySVGs = await Promise.all(
    results
      .map((ele) => new SVG(ele, location))
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
      return svg
    }) as SVG[]
}

export default processElements
