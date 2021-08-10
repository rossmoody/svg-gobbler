export type PageElement =
  | Element
  | SVGSVGElement
  | HTMLImageElement
  | HTMLDivElement
  | SVGSymbolElement
  | SVGGElement

function getElementsByTag(tag: string): PageElement[] {
  const elements = document.querySelectorAll(tag)
  return [...elements]
}

function findSVGs() {
  const svgElements = getElementsByTag('svg')
  const objectElements = getElementsByTag('object[data*=".svg"]')
  const symbolElements = getElementsByTag('symbol')
  const imageElements = getElementsByTag('img')
  const divElements = getElementsByTag('div')
  const gElements = getElementsByTag('g')

  return [
    ...svgElements,
    ...imageElements,
    ...objectElements,
    ...divElements,
    ...symbolElements,
    ...gElements,
  ]
}

export default findSVGs
