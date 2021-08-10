import { PageElement } from './gather-elements'

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
  divBgUrl?: string
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
    const hasPng = string.includes('.png')
    const hasSvg = string.includes('.svg')
    return hasSvg && !hasPng
  }

  private parseStringToElement(string: string) {
    const { documentElement } = new DOMParser().parseFromString(
      string,
      'image/svg+xml'
    )
    return documentElement
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
        const hasId = this.elementClone.id
        if (hasId) this.type = 'g'
        break
      }

      case 'OBJECT': {
        this.type = 'object'
        this.dataSrcHref = (this.elementClone as HTMLObjectElement).data
        break
      }

      case 'IMG': {
        const imgSrc = (this.elementClone as HTMLImageElement).src
        const hasSvgFilename = this.hasSvgFilename(imgSrc)
        const hasDataUriBgImg = this.hasDataUriBgImg(imgSrc)
        const hasBase64BgImg = this.hasBase64BgImg(imgSrc)

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
            this.elementClone = svgElement
          }
        }
        break
      }

      case 'DIV': {
        const divElement = this.originalElementReference as HTMLDivElement
        const computedStyle = window.getComputedStyle(divElement)
        const backgroundImageUrl = computedStyle.backgroundImage

        const hasBase64BgImg = this.hasBase64BgImg(backgroundImageUrl)
        const hasSvgFilename = this.hasSvgFilename(backgroundImageUrl)
        const hasDataUriBgImg = this.hasDataUriBgImg(backgroundImageUrl)

        if (hasBase64BgImg || hasSvgFilename || hasDataUriBgImg)
          this.type = 'bg img'

        if (hasBase64BgImg) {
          try {
            const base64RegEx = /(?<=,)(.*)(?=")/
            const base64String = base64RegEx.exec(backgroundImageUrl)

            if (base64String) {
              const svgString = atob(base64String[0])
              const svgElement = this.parseStringToElement(svgString)
              this.elementClone = svgElement
            }
          } catch (error) {
            this.cors = true
          }
        }

        if (hasSvgFilename) {
          const urlRegex = /(?<=url\(")(.*)(?<=.svg)/
          const regexResult = urlRegex.exec(backgroundImageUrl)

          if (regexResult) {
            const url = regexResult[0]
            this.divBgUrl = url
          }
        }

        if (this.hasDataUriBgImg(backgroundImageUrl)) {
          const regex = /(?=<svg)(.*\n?)(?<=<\/svg>)/
          const regexResult = regex.exec(backgroundImageUrl)

          if (regexResult) {
            const string = regexResult[0].replace(/\\/g, '')
            const svgElement = this.parseStringToElement(string)
            this.elementClone = svgElement
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
