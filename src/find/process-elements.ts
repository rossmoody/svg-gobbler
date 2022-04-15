import SVG from './SVG'

async function processElements(strings: string[], location: string) {
  const elements = [] as Element[]

  strings.forEach((string) => {
    const { body } = new DOMParser().parseFromString(string, 'text/html')
    if (body.firstElementChild) elements.push(body.firstElementChild)
  })

  return await Promise.all(
    elements
      .map((ele) => new SVG(ele, location))
      .filter((ele) => ele.isValid)
      .map((svg) => {
        svg.removeFillNone()
        svg.removeClass()
        return svg
      })
  )
}

export default processElements
