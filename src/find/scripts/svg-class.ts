import { PageElement } from './find-svgs'

type SVGType =
  | 'inline'
  | 'object'
  | 'sprite'
  | 'symbol'
  | 'img src'
  | 'object'
  | 'bg img'
  | 'invalid'
  | 'g'

export class SVGClass {
  originalElementReference: PageElement
  elementClone: PageElement
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
  gChildren?: SVGGElement

  readonly id = Math.random()

  constructor(element: PageElement) {
    this.originalElementReference = element
    this.elementClone = element.cloneNode(true) as HTMLElement
    this.determineType()
    this.setSpriteHref()
    this.buildSymbolElement()
    this.buildGElement()
  }

  private hasBase64BgImg(string: string) {
    return string.includes('data:image/svg+xml;base64')
  }

  private hasDataUriBgImg(string: string) {
    return string.includes('data:image/svg+xml;utf8')
  }

  private hasSvgFilename(string: string) {
    return string.includes('.svg')
  }

  private determineType() {
    const tagName = this.elementClone.tagName
    const svgElement = this.elementClone

    const querySvgTag = (tag: keyof SVGElementTagNameMap) =>
      Array.from(svgElement.querySelectorAll(tag))

    switch (tagName) {
      case 'svg': {
        this.type = 'inline'

        const symbolElements = querySvgTag('symbol')
        const useTags = querySvgTag('use')
        const defsTags = querySvgTag('defs')

        const hasSymbolOrDefs = symbolElements.length > 0 || defsTags.length > 0
        const hasUseTags = useTags.length > 0

        // Filter out. Symbols are manually built
        if (hasSymbolOrDefs) this.type = 'invalid'
        if (hasUseTags) this.type = 'sprite'

        break
      }

      case 'symbol': {
        this.type = 'symbol'

        break
      }

      case 'g': {
        this.type = 'g'

        break
      }

      case 'OBJECT': {
        this.type = 'object'
        this.dataSrcHref = (this.elementClone as HTMLObjectElement).data

        break
      }

      case 'IMG': {
        const imgSrc = (this.elementClone as HTMLImageElement).src

        if (this.hasBase64BgImg(imgSrc) || this.hasSvgFilename(imgSrc)) {
          this.type = 'img src'
          this.imgSrcHref = imgSrc
        }

        if (this.hasDataUriBgImg(imgSrc)) {
          const regex = /(?=<svg)(.*\n?)(?<=<\/svg>)/
          const svgString = regex.exec(imgSrc)

          if (svgString) {
            const { documentElement } = new DOMParser().parseFromString(
              svgString[0],
              'image/svg+xml'
            )

            this.elementClone = documentElement
            this.type = 'img src'
          }
        }

        break
      }

      case 'DIV': {
        const divElement = this.originalElementReference as HTMLDivElement
        const backgroundImageUrl =
          window.getComputedStyle(divElement).backgroundImage

        if (
          this.hasBase64BgImg(backgroundImageUrl) ||
          this.hasSvgFilename(backgroundImageUrl)
        ) {
          this.type = 'bg img'
          this.imgSrcHref = backgroundImageUrl
        }

        if (this.hasDataUriBgImg(backgroundImageUrl)) {
          const regex = /(?=<svg)(.*\n?)(?<=<\/svg>)/
          const regexResult = regex.exec(backgroundImageUrl)
          const validRegex = Boolean(regexResult && regexResult[0])

          if (validRegex) {
            const string = regexResult![0].replace(/\\/g, '')
            const { documentElement } = new DOMParser().parseFromString(
              string,
              'image/svg+xml'
            )

            this.type = 'bg img'
            this.elementClone = documentElement
          }
        }

        break
      }

      default:
        this.type = 'invalid'
    }
  }

  private buildSymbolElement() {
    if (this.type !== 'symbol') return

    const symbolElement = this.elementClone.cloneNode(true) as SVGSymbolElement

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
      `#${this.elementClone.id}`
    )

    svgElement.appendChild(symbolElement)
    svgElement.appendChild(useElement)

    this.type = 'sprite'
    this.elementClone = svgElement
  }

  private buildGElement() {
    if (this.type !== 'g') return

    const gElement = this.elementClone.cloneNode(true) as SVGGElement
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
    this.elementClone = svgElement
  }

  private setSpriteHref() {
    const isSpriteInstance = this.type === 'sprite'
    if (!isSpriteInstance) return

    const useElement = this.elementClone.querySelector('use')!
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
