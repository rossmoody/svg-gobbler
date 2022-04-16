/**
 * Returns an array of unique element strings that
 * include 'svg' somewhere in the string
 */
function findSVGs() {
  const getElementsByTag = (tag: string) =>
    Array.from(document.querySelectorAll(tag))
      .map((element) => element.outerHTML)
      .filter((element) => element.includes('svg'))

  const svgElements = getElementsByTag('svg')
  const objectElements = getElementsByTag('object[data*=".svg"]')
  const symbolElements = getElementsByTag('symbol')
  const imageElements = getElementsByTag('img')
  const gElements = getElementsByTag('g')

  return [
    ...new Set([
      ...svgElements,
      ...objectElements,
      ...symbolElements,
      ...imageElements,
      ...gElements,
    ]),
  ]
}

export default findSVGs
