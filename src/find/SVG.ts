type SVGType = 'inline' | 'sprite' | 'symbol' | 'img src' | 'invalid' | 'g'

class SVG {
  type: SVGType = 'invalid'
  cors = false
  id = Math.random()

  constructor(public element: Element, public location: string) {
    this.determineType()
    this.buildSpriteElement()
  }

  parseFromStringTextHtml(string: string) {
    const { body } = new DOMParser().parseFromString(string, 'text/html')
    return body.firstElementChild ?? new Element()
  }

  private parseFromStringImageXml(string: string) {
    const parser = new DOMParser()
    const { documentElement } = parser.parseFromString(string, 'image/svg+xml')
    return documentElement
  }

  private determineType() {
    const svgElement = this.element

    switch (this.element.tagName) {
      case 'svg': {
        this.type = 'inline'
        break
      }

      case 'symbol': {
        this.type = 'symbol'
        break
      }

      case 'g': {
        if (svgElement.id) {
          this.type = 'g'
        }
        break
      }

      case 'IMG': {
        this.type = 'img src'

        const imgSrc = (this.element as HTMLImageElement).src
        const hasDataUriBgImg = imgSrc.includes('data:image/svg+xml;utf8')

        if (hasDataUriBgImg) {
          const regex = /(?=<svg)(.*\n?)(?<=<\/svg>)/
          const svgString = regex.exec(imgSrc)

          if (svgString) {
            const result = this.parseFromStringImageXml(svgString[0])
            console.log(result, 'hasDataUriBgImg')
          }
        }
        break
      }
    }
  }

  private createSvgElement() {
    const clone = this.element.cloneNode(true) as SVGSymbolElement

    const nameSpace = 'http://www.w3.org/2000/svg'
    const viewBox = clone.getAttribute('viewBox')
    const height = clone.getAttribute('height')
    const width = clone.getAttribute('width')
    const svgElement = document.createElementNS(nameSpace, 'svg')

    svgElement.setAttributeNS(
      'http://www.w3.org/2000/xmlns/',
      'xmlns',
      nameSpace,
    )

    if (viewBox) svgElement.setAttribute('viewBox', viewBox)
    if (height) svgElement.setAttribute('height', height)
    if (width) svgElement.setAttribute('width', width)

    const useElement = document.createElementNS(nameSpace, 'use')
    useElement.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      `#${clone.id}`,
    )

    svgElement.appendChild(clone)
    svgElement.appendChild(useElement)
    return svgElement
  }

  private buildSpriteElement() {
    if (this.type === 'symbol' || this.type === 'g') {
      this.type = 'sprite'
      this.element = this.createSvgElement()
    }
  }

  removeFillNone() {
    const fill = this.element.getAttribute('fill')
    const stroke = this.element.getAttribute('stroke')
    const hasFillNone = fill === 'none'
    const hasStroke = Boolean(stroke)
    if (hasFillNone && !hasStroke) {
      this.element.removeAttribute('fill')
    }
  }

  removeClass() {
    this.element.removeAttribute('class')
  }

  get imgSrcHref() {
    const imgSrc = this.element.getAttribute('src')
    const dataSrc = this.element.getAttribute('data-src')

    if (imgSrc?.includes('.svg')) {
      return imgSrc?.startsWith('/')
        ? this.location.replace(/\/$/, '') + imgSrc
        : imgSrc
    }
    if (dataSrc?.includes('.svg')) {
      return dataSrc?.startsWith('/')
        ? this.location.replace(/\/$/, '') + dataSrc
        : dataSrc
    }

    return ''
  }

  get viewBox() {
    return this.element.getAttribute('viewBox')
  }

  get isValid() {
    return this.type !== 'invalid'
  }

  get svgString() {
    return new XMLSerializer().serializeToString(this.element)
  }

  get whiteFill() {
    const whiteFills = ['#FFF', '#fff', '#FFFFFF', '#ffffff', 'white']
    const svgOuterHtml = this.element.outerHTML
    return whiteFills.some((fill) => svgOuterHtml.includes(fill))
  }

  get size() {
    if (Boolean(this.width) && Boolean(this.height)) {
      return `${this.width}x${this.height}`
    } else {
      return 'N/A'
    }
  }

  get presentationSvg() {
    const attributes = ['height', 'width', 'style', 'class']
    const htmlElement = this.element.cloneNode(true) as HTMLElement
    if (!this.cors)
      attributes.forEach((attr) => htmlElement.removeAttribute(attr))
    return new XMLSerializer().serializeToString(htmlElement)
  }

  get width() {
    const width = this.element.getAttribute('width') ?? ''

    if (!width && this.viewBox) {
      const [, , viewBoxWidth] = this.viewBox.split(' ')
      return Math.ceil(parseInt(viewBoxWidth, 10))
    }

    return width.replace('px', '')
  }

  get height() {
    const height = this.element.getAttribute('height') ?? ''

    if (!height && this.viewBox) {
      const [, , , viewBoxHeight] = this.viewBox.split(' ')
      return Math.ceil(parseInt(viewBoxHeight, 10))
    }

    return height.replace('px', '')
  }

  private async fetch(url: string) {
    try {
      const response = await fetch(url, { method: 'GET', mode: 'cors' })
      const svgString = await response.text()
      return this.parseFromStringImageXml(svgString)
    } catch (error) {
      return false
    }
  }

  async fetchSvgContent() {
    if (this.imgSrcHref) {
      console.log(this.imgSrcHref)
      const imgSrcResponse = await this.fetch(this.imgSrcHref)
      imgSrcResponse ? (this.element = imgSrcResponse) : (this.cors = true)
    }
  }
}

export default SVG
