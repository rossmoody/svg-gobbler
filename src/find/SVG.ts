type SVGType =
  | 'inline'
  | 'sprite'
  | 'symbol'
  | 'img src'
  | 'object'
  | 'bg img'
  | 'invalid'
  | 'g'

class SVG {
  type: SVGType = 'invalid'
  cors = false
  spriteHref?: string
  dataSrcHref?: string
  viewBox?: string
  spriteSymbolArray?: SVGSymbolElement[]
  _imgSrcHref: string

  readonly id = Math.random()

  constructor(public element: Element, public location: string) {
    this.determineType()
    this.buildSpriteElement()
  }

  private stringToElement(string: string) {
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

      case 'OBJECT': {
        this.type = 'object'
        this.dataSrcHref = (this.element as HTMLObjectElement).data
        break
      }

      case 'IMG': {
        this.type = 'img src'

        const imgSrc = (this.element as HTMLImageElement).src
        const hasSvgFilename = imgSrc.includes('.svg')
        const hasDataUriBgImg = imgSrc.includes('data:image/svg+xml;utf8')
        const hasBase64BgImg = imgSrc.includes('data:image/svg+xml;base64')

        if (hasBase64BgImg || hasSvgFilename) {
          this.imgSrcHref = imgSrc
        }

        if (hasDataUriBgImg) {
          const regex = /(?=<svg)(.*\n?)(?<=<\/svg>)/
          const svgString = regex.exec(imgSrc)

          if (svgString) {
            this.element = this.stringToElement(svgString[0])
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
      nameSpace
    )

    if (viewBox) svgElement.setAttribute('viewBox', viewBox)
    if (height) svgElement.setAttribute('height', height)
    if (width) svgElement.setAttribute('width', width)

    const useElement = document.createElementNS(nameSpace, 'use')
    useElement.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      `#${clone.id}`
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

  set imgSrcHref(url: string) {
    if (url[0] === '/') {
      this._imgSrcHref = this.location + url
    } else {
      this._imgSrcHref = url.replace(
        'chrome-extension://hghbphamkebpljkdjgbipkafbldcpmof/',
        this.location
      )
    }
  }

  get imgSrcHref() {
    return this._imgSrcHref
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
    let width = this.element.getAttribute('width') ?? ''

    if (!width && this.viewBox) {
      const [, , viewBoxWidth] = this.viewBox.split(' ')
      return Math.ceil(parseInt(viewBoxWidth, 10))
    }

    return width.replace('px', '')
  }

  get height() {
    let height = this.element.getAttribute('height') ?? ''

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
      return this.stringToElement(svgString)
    } catch (error) {
      return false
    }
  }

  async fetchSvgContent() {
    if (this.imgSrcHref) {
      const imgSrcResponse = await this.fetch(this.imgSrcHref)
      imgSrcResponse ? (this.element = imgSrcResponse) : (this.cors = true)
    }

    if (this.spriteHref) {
      const spriteResponse = await this.fetch(this.spriteHref)
      if (spriteResponse) {
        const symbolElements = Array.from(
          spriteResponse.querySelectorAll('symbol')
        )

        if (Boolean(symbolElements)) {
          this.element = spriteResponse
        } else {
          this.cors = true
        }
      }

      if (this.dataSrcHref) {
        const dataResponse = await this.fetch(this.dataSrcHref)
        dataResponse ? (this.element = dataResponse) : this.type === 'invalid'
      }
    }
  }
}

export default SVG
