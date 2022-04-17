import SVG from './SVG'

async function processElements(strings: string[], location: string) {
  const promises = await Promise.all(
    strings
      .map((string) => new SVG(string, location))
      .filter((ele) => ele.isValid)
      .map(async (ele) => {
        await ele.fetchSvgContent()
        return ele
      }),
  )

  return [...new Set(promises.filter((ele) => ele.isValid))]
}

export default processElements
