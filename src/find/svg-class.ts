type SVGType =
  | 'inline'
  | 'sprite'
  | 'symbol'
  | 'img src'
  | 'object'
  | 'bg img'
  | 'invalid'
  | 'g'

export class SVGClass {
  type: SVGType = 'invalid'
  cors = false
  whiteFill = false
  spriteHref?: string
  imgSrcHref?: string
  dataSrcHref?: string
  svgString?: string
  viewBox?: string
  width?: number
  height?: number
  size?: string
  presentationSvg?: string
  spriteSymbolArray?: SVGSymbolElement[]

  readonly id = Math.random()

  constructor(public element: Element, public location: string) {
    this.determineType()
    this.setSpriteHref()
    this.buildSymbolElement()
    this.buildGElement()
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
        if ([...svgElement.querySelectorAll('use')].length > 0) {
          this.type = 'sprite'
        } else {
          this.type = 'inline'
        }
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

  private createSvgElement(element: SVGSymbolElement | SVGGElement) {
    const clone = element.cloneNode(true) as SVGSymbolElement

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

  private buildSymbolElement() {
    if (this.type === 'symbol') {
      this.type = 'sprite'
      this.element = this.createSvgElement(this.element as SVGSymbolElement)
    }
  }

  private buildGElement() {
    if (this.type === 'g') {
      this.type = 'sprite'
      this.element = this.createSvgElement(this.element as SVGGElement)
    }
  }

  private setSpriteHref() {
    if (this.type === 'sprite') {
      const useElement = this.element.querySelector('use')!
      const ownerDocument = document.URL
      const xlinkHref = useElement.getAttribute('xlink:href')
      const spriteHref = `${ownerDocument}${xlinkHref}`

      /**
       * If the sprite is being made via a call to a remote svg sheet
       * then try to get it via fetch. Otherwise the symbol is likely in the DOM
       * and it will be built via the symbol function.
       */
      if (spriteHref && spriteHref.includes('.svg')) {
        this.spriteHref = spriteHref
      } else {
        this.type = 'invalid'
      }
    }
  }
}

export default SVGClass
