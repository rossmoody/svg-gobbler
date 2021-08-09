export type PageElement =
  | Element
  | SVGSVGElement
  | HTMLImageElement
  | HTMLDivElement
  | SVGSymbolElement
  | SVGGElement

function findSVGs(): PageElement[] {
  const svgTags = Array.from(document.querySelectorAll('svg'))
  const objDatas = Array.from(document.querySelectorAll('object[data*=".svg"]'))
  const symbolElements = Array.from(document.getElementsByTagName('symbol'))
  const imgSrcs = Array.from(document.querySelectorAll('img'))
  const divs = Array.from(document.querySelectorAll('div'))
  const gElements = Array.from(document.getElementsByTagName('g')).filter(
    (element) => element.id
  )
  const pageSVGs = [
    ...svgTags,
    ...imgSrcs,
    ...objDatas,
    ...divs,
    ...symbolElements,
    ...gElements,
  ]

  return pageSVGs
}

export default findSVGs
