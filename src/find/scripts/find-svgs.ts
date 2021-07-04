export type PageElement =
  | Element
  | SVGSVGElement
  | HTMLImageElement
  | HTMLDivElement

function findSVGs(): PageElement[] {
  const svgTags = Array.from(window.document.querySelectorAll('svg'))
  const objDatas = Array.from(
    window.document.querySelectorAll('object[data*=".svg"]')
  )
  const imgSrcs = Array.from(window.document.querySelectorAll('img'))
  const pageDivs = Array.from(window.document.querySelectorAll('div'))

  const pageSVGs = [...svgTags, ...imgSrcs, ...objDatas, ...pageDivs]

  return pageSVGs
}

export default findSVGs
