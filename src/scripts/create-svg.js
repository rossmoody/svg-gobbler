import classify from './classify-svg'

class SVG {
  constructor(el) {
    this.origEle = el.cloneNode(true)
    this.origEleString = undefined
    this.url = undefined
    this.type = undefined
    this.size = undefined
    this.height = 48
    this.width = 48
    this.svgString = undefined
    this.presentationSvg = undefined
    this.cors = false
    this.hasWhite = false
    this.spriteId = undefined
  }
}

SVG.prototype.determineType = classify.determineType
SVG.prototype.serialize = classify.serialize
SVG.prototype.determineSize = classify.determineSize
SVG.prototype.fetchSvg = classify.fetchSvg
SVG.prototype.checkForWhite = classify.checkForWhite

export default SVG
