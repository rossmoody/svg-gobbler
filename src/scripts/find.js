import util from './util'

class SVG {
  constructor(svg) {
    this.originalSvg = svg

    if (this.originalSvg.tagName === 'svg') {
      const firstChild = this.originalSvg.firstElementChild
      if (firstChild && firstChild.tagName === 'symbol') {
        this.type = 'symbol'
        this.spriteId = this.originalSvg.getAttribute('id')
      } else if (firstChild && firstChild.tagName === 'use') {
        this.type = 'sprite'
        this.spriteId = firstChild.getAttributeNS(
          'http://www.w3.org/1999/xlink',
          'href'
        )
      } else {
        this.type = 'inline'
      }
    } else if (this.originalSvg.tagName === 'IMG') {
      this.url = this.originalSvg.src
      this.type = 'img src'
    } else if (this.originalSvg.tagName === 'OBJECT') {
      this.url = this.data
      this.type = 'object'
    } else if (this.originalSvg.tagName === 'DIV') {
      const style = window.getComputedStyle(this.originalSvg, null)
      const url = style.backgroundImage.slice(4, -1).replace(/"/g, '')
      const fileType = url.substr(url.lastIndexOf('.') + 1)

      if (style.backgroundImage !== 'none' && /(svg)$/gi.test(fileType)) {
        this.url = url
        this.type = 'bg img'
      }
    }
  }
}

/**
 * Gather all the possible SVG elements on a page
 */
async function findSVGs() {
  const svgTags = Array.from(document.querySelectorAll('svg'))
  const objDatas = Array.from(document.querySelectorAll('object[data*=".svg"]'))
  const imgSrcs = Array.from(document.querySelectorAll('img[src*=".svg"]'))
  const pageDivs = Array.from(document.querySelectorAll('div'))

  const pageSVGs = [...svgTags, ...imgSrcs, ...objDatas, ...pageDivs]

  /**
   * Classify the elements and filter out div elements with no SVG attributes
   */
  let filteredSVGs = pageSVGs
    .map(ele => new SVG(ele))
    .filter(svg => svg.type)
    .map(svg => util.serialize(svg, 'dupCheck', 'originalSvg'))

  filteredSVGs = util.removeDups(filteredSVGs, 'dupCheck')

  return filteredSVGs
}

export default findSVGs
