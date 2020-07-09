import classify from './classify-svg'

class SVG {
  constructor(el) {
    const rects = el.getBoundingClientRect()

    this.origEle = el.cloneNode(true)
    this.type = undefined
    this.url = undefined
    this.size = undefined
    this.svgString = undefined
    this.presentationSvg = undefined
    this.cors = false
    this.hasWhite = false
    this.spriteId = undefined
    this.spriteMaster = false
    this.height = Math.ceil(rects.height)
    this.width = Math.ceil(rects.width)
  }
}

SVG.prototype.fixupString = classify.fixupString
SVG.prototype.determineType = classify.determineType
SVG.prototype.determineSize = classify.determineSize
SVG.prototype.fetchSvg = classify.fetchSvg
SVG.prototype.checkForWhite = classify.checkForWhite
SVG.prototype.buildSpriteString = classify.buildSpriteString

export default SVG
