import fetchSVGContent from './async-operations'
import process from './process-svg'
import SVG from './SVG'

async function processElements(strings: string[], location: string) {
  const elements = [] as Element[]

  strings.forEach((string) => {
    const { body } = new DOMParser().parseFromString(string, 'text/html')
    if (body.firstElementChild) elements.push(body.firstElementChild)
  })

  const promises = await Promise.all(
    elements
      .map((ele) => new SVG(ele, location))
      .filter((ele) => ele.isValid)
      .map((ele) => {
        return fetchSVGContent.call(ele)
      })
  )

  return promises
    .flatMap((svg) => process.processSvgSymbolsFromFetchCall.call(svg))
    .filter((ele) => ele.isValid)
    .map((svg) => {
      svg.removeFillNone()
      svg.removeClass()
      process.setWidthHeight.call(svg)
      process.setSize.call(svg)
      process.createPresentationSvg.call(svg)
      return svg
    }) as SVG[]
}

export default processElements
