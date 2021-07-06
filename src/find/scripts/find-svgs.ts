export type PageElement =
  | Element
  | SVGSVGElement
  | HTMLImageElement
  | HTMLDivElement
  | SVGSymbolElement

function findSVGs(): PageElement[] {
  const svgTags = [...window.document.querySelectorAll('svg')]
  const objDatas = [...window.document.querySelectorAll('object[data*=".svg"]')]
  const symbolElements = [...window.document.querySelectorAll('symbol')]
  const imgSrcs = [...window.document.querySelectorAll('img')]
  const pageDivs = [...window.document.querySelectorAll('div')]

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
