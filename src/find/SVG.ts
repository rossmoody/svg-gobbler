type SVGType = 'inline' | 'sprite' | 'symbol' | 'img src' | 'invalid' | 'g'

class SVG {
  type: SVGType = 'invalid'
  cors = false
  id = Math.random()
  element!: Element

  constructor(public originalString: string, public location: string) {
    this.determineType()
    this.buildSpriteElement()
  }

  private determineType() {
    switch (true) {
      case this.originalString.includes('<svg'): {
        this.type = 'inline'
        this.parseFromStringXmlMime()
        break
      }

      case this.originalString.includes('<symbol'): {
        this.type = 'symbol'
        this.parseFromStringXmlMime()
        break
      }

      case this.originalString.includes('<g'): {
        this.type = 'g'
        this.parseFromStringXmlMime()
        break
      }

      case this.originalString.includes('<img'): {
        this.type = 'img src'
        this.parseFromStringTextMime()
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
    viewBox && svgElement.setAttribute('viewBox', viewBox)
    height && svgElement.setAttribute('height', height)
    width && svgElement.setAttribute('width', width)

    const useElement = document.createElementNS(nameSpace, 'use')
    useElement.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      `#${clone.id}`,
    )

    svgElement.appendChild(clone)
    svgElement.appendChild(useElement)
    console.log(svgElement, 'created element')
    this.element = svgElement
  }

  private buildSpriteElement() {
    if (this.type === 'symbol' || this.type === 'g') {
      console.log(this, 'build sprite element')
      this.type = 'sprite'
      this.createSvgElement()
    }
  }

  private get htmlSource() {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <base href=${this.location}>
      </head>
      <body>
        ${this.originalString}
      </body>
    </html>
    `
  }

  removeFillNone() {
    const fillNone = this.element.getAttribute('fill') === 'none'
    const stroke = this.element.getAttribute('stroke')
    if (fillNone && !stroke) this.element.removeAttribute('fill')
  }

  removeClass() {
    this.element.removeAttribute('class')
  }

  parseFromStringTextMime() {
    const { body } = new DOMParser().parseFromString(
      this.htmlSource,
      'text/html',
    )
    const errorNode = body.querySelector('parsererror')
    if (errorNode) this.type === 'invalid'
    this.element = body.firstElementChild ?? new Element()
  }

  parseFromStringXmlMime() {
    const { documentElement } = new DOMParser().parseFromString(
      this.originalString,
      'image/svg+xml',
    )
    const errorNode = documentElement.querySelector('parsererror')
    if (errorNode) this.type === 'invalid'
    this.element = documentElement
  }

  get imgSrcHref() {
    const imgSrc = this.element.getAttribute('src')
    const dataSrc = this.element.getAttribute('data-src')

    if (imgSrc?.includes('.svg')) {
      return imgSrc?.startsWith('http')
        ? imgSrc
        : this.location.replace(/\/$/, '') + imgSrc
    }
    if (dataSrc?.includes('.svg')) {
      return dataSrc?.startsWith('http')
        ? dataSrc
        : this.location.replace(/\/$/, '') + dataSrc
    }

    return ''
  }

  get viewBox() {
    return this.element.getAttribute('viewBox')
  }

  get isValid() {
    return this.type !== 'invalid'
  }

  get elementAsString() {
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
    const htmlElement = this.element.cloneNode(true) as HTMLElement &
      HTMLImageElement

    if (!this.cors) {
      attributes.forEach((attr) => htmlElement.removeAttribute(attr))
    }

    if (this.type === 'img src') {
      htmlElement.src = this.imgSrcHref
    }

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

  async fetchSvgContent() {
    if (this.imgSrcHref) {
      console.log('Image src href before fetch', '\n', this.imgSrcHref)

      try {
        const response = await fetch(this.imgSrcHref, {
          method: 'GET',
          mode: 'cors',
        })
        this.originalString = await response.text()
        this.parseFromStringXmlMime()
      } catch (error) {
        this.cors = true
      }
    }
  }
}

export default SVG
