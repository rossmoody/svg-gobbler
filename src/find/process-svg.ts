import SVG from './SVG'

const process = {
  removeFillNone(this: SVG) {
    const svgElement = this.element

    const fill = svgElement.getAttribute('fill')
    const stroke = svgElement.getAttribute('stroke')

    const hasFillNone = fill === 'none'
    const hasStroke = Boolean(stroke)

    if (hasFillNone && !hasStroke) svgElement.removeAttribute('fill')
  },

  removeClass(this: SVG) {
    const svgElement = this.element
    svgElement.removeAttribute('class')
  },

  setViewBox(this: SVG) {
    const svgElement = this.element
    const classViewBox = this.viewBox
    const elementViewBox = svgElement.getAttribute('viewBox')

    if (elementViewBox) this.viewBox = elementViewBox
    if (classViewBox) this.element.setAttribute('viewBox', classViewBox)
  },

  setWidthHeight(this: SVG) {
    const svgElement = this.element
    const viewBox = this.viewBox
    const width: string | null = svgElement.getAttribute('width')
    const height: string | null = svgElement.getAttribute('height')

    if (viewBox) {
      const viewBoxStringArray = this.viewBox!.split(' ')
      const [, , viewBoxWidth, viewBoxHeight] = viewBoxStringArray

      this.width = Math.ceil(parseInt(viewBoxWidth, 10))
      this.height = Math.ceil(parseInt(viewBoxHeight, 10))
    }

    const hasValidWidthHeight =
      width && height && !width.includes('%') && !height.includes('%')

    if (hasValidWidthHeight) {
      const validWidth = width!.replace('px', '')
      const validHeight = height!.replace('px', '')

      this.width = Math.ceil(parseInt(validWidth, 10))
      this.height = Math.ceil(parseInt(validHeight, 10))

      if (!viewBox) {
        this.viewBox = `0 0 ${validWidth} ${validHeight}`
      }
    }
  },

  setSize(this: SVG) {
    this.size = 'N/A'
    const hasHeightWidth = Boolean(this.width) && Boolean(this.height)
    if (hasHeightWidth) this.size = `${this.width}x${this.height}`
  },

  createPresentationSvg(this: SVG) {
    const htmlElement = this.element.cloneNode(true) as HTMLElement
    const isCorsRestricted = this.cors

    if (!isCorsRestricted) {
      const attributes = ['height', 'width', 'style', 'class']
      attributes.forEach((attr) => htmlElement.removeAttribute(attr))
    }

    this.presentationSvg = new XMLSerializer().serializeToString(htmlElement)
  },

  hasWhiteFill(this: SVG) {
    const whiteFills = ['#FFF', '#fff', '#FFFFFF', '#ffffff', 'white']
    const svgOuterHtml = this.element.outerHTML
    this.whiteFill = whiteFills.some((fill) => svgOuterHtml.includes(fill))
  },

  processSvgSymbolsFromFetchCall(this: SVG) {
    if (this.spriteSymbolArray) {
      return this.spriteSymbolArray.map(
        (symbol) => new SVG(symbol, this.location)
      )
    } else {
      return this
    }
  },
}

export default process
