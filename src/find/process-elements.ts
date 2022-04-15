import fetchSVGContent from './async-operations'
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
    .filter((ele) => ele.isValid)
    .map((svg) => {
      svg.removeFillNone()
      svg.removeClass()
      return svg
    }) as SVG[]
}

export default processElements
