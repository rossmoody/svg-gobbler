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
  divBgUrl?: string
  svgString?: string
  viewBox?: string
  width?: number
  height?: number
  size?: string
  presentationSvg?: string
  spriteSymbolArray?: SVGSymbolElement[]

  readonly id = Math.random()

  constructor(
    public originalElementReference: Element,
    public location: string
  ) {
    this.determineType()
    this.setSpriteHref()
    this.buildSymbolElement()
    this.buildGElement()
  }

  hasBase64BgImg(string: string) {
    return string.includes('data:image/svg+xml;base64')
  }

  hasDataUriBgImg(string: string) {
    return string.includes('data:image/svg+xml;utf8')
  }

  hasSvgFilename(string: string) {
    const hasPng = string.includes('.png')
    const hasSvg = string.includes('.svg')
    return hasSvg && !hasPng
  }

  parseStringToElement(string: string) {
    const { documentElement } = new DOMParser().parseFromString(
      string,
      'image/svg+xml'
    )
    return documentElement
  }

  private determineType() {
    const tagName = this.originalElementReference.tagName
    const svgElement = this.originalElementReference

    switch (tagName) {
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
        this.dataSrcHref = (
          this.originalElementReference as HTMLObjectElement
        ).data
        break
      }

      case 'IMG': {
        const imgSrc = (this.originalElementReference as HTMLImageElement).src
        const hasSvgFilename = this.hasSvgFilename(imgSrc)
        const hasDataUriBgImg = this.hasDataUriBgImg(imgSrc)
        const hasBase64BgImg = this.hasBase64BgImg(imgSrc)

        console.log(this, imgSrc)

        if (hasSvgFilename || hasDataUriBgImg || hasBase64BgImg) {
          this.type = 'img src'
        }

        if (hasBase64BgImg || hasSvgFilename) {
          this.imgSrcHref = imgSrc
        }

        if (hasDataUriBgImg) {
          const regex = /(?=<svg)(.*\n?)(?<=<\/svg>)/
          const svgString = regex.exec(imgSrc)

          if (svgString) {
            const svgElement = this.parseStringToElement(svgString[0])
            this.originalElementReference = svgElement
          }
        }
        break
      }
    }
  }

  private buildSymbolElement() {
    if (this.type !== 'symbol') return

    const symbolElement = this.originalElementReference.cloneNode(
      true
    ) as SVGSymbolElement

    symbolElement.removeAttribute('fill')

    const nameSpace = 'http://www.w3.org/2000/svg'
    const viewBox = symbolElement.getAttribute('viewBox')
    const height = symbolElement.getAttribute('height')
    const width = symbolElement.getAttribute('width')
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
      `#${this.originalElementReference.id}`
    )

    svgElement.appendChild(symbolElement)
    svgElement.appendChild(useElement)

    this.type = 'sprite'
    this.originalElementReference = svgElement
  }

  private buildGElement() {
    if (this.type !== 'g') return

    const gElement = this.originalElementReference.cloneNode(
      true
    ) as SVGGElement
    const gId = gElement.id

    const viewBox = gElement.getAttribute('viewBox')
    const height = gElement.getAttribute('height')
    const width = gElement.getAttribute('width')

    const nameSpace = 'http://www.w3.org/2000/svg'
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
      `#${gId}`
    )

    svgElement.appendChild(gElement)
    svgElement.appendChild(useElement)

    this.type = 'sprite'
    this.originalElementReference = svgElement
  }

  private setSpriteHref() {
    if (this.type !== 'sprite') return

    const useElement = this.originalElementReference.querySelector('use')!
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

export default SVGClass
