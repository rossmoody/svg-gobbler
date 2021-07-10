export type PageElement =
  | Element
  | SVGSVGElement
  | HTMLImageElement
  | HTMLDivElement
  | SVGSymbolElement

function findSVGs(): PageElement[] {
  const svgTags = [...document.querySelectorAll('svg')]
  const objDatas = [...document.querySelectorAll('object[data*=".svg"]')]
  const symbolElements = [...document.querySelectorAll('symbol')]
  const imgSrcs = [...document.querySelectorAll('img')]
  const pageDivs = [...document.querySelectorAll('div')]

  const pageSVGs = [
    ...svgTags,
    ...imgSrcs,
    ...objDatas,
    ...pageDivs,
    ...symbolElements,
  ]

  return pageSVGs
}

export default findSVGs
