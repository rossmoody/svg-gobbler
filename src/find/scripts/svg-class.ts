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
  originalElementRef: PageElement
  type: SVGType = 'invalid'
  cors = false

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
    this.originalElementRef = element.cloneNode(true) as HTMLElement
    this.determineType()
    this.setSpriteHref()
    this.buildSymbolElement()
    this.buildGElement()
  }

  private determineType() {
    const tagName = this.originalElementRef.tagName

    switch (tagName) {
      case 'svg': {
        this.type = 'inline'

        const children = Array.from(this.originalElementRef.children)

        const hasUseOrImgTag = children.some(
          (child) => child.tagName === 'use' || child.tagName === 'img'
        )

        const hasSymbolChildren = children.some(
          (element) => element.tagName === 'symbol'
        )

        const hasImgChildren = children.some(
          (element) => element.tagName === 'image' || element.tagName === 'IMG'
        )

        const hasDefs = children.some((element) => element.tagName === 'defs')

        if (hasUseOrImgTag) this.type = 'sprite'
        if (hasSymbolChildren) this.type = 'invalid'
        if (hasDefs) this.type = 'invalid'
        // This needs improved. Fetch calls can be made to
        // images embedded in svgs with hrefs
        if (hasImgChildren) this.type = 'invalid'

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

      case 'IMG': {
        const imageSourceHref = (this.originalElementRef as HTMLImageElement)
          .src

        if (!imageSourceHref) return

        const imgSrcFileType = imageSourceHref.split('.').pop()

        const hasSVGFileType = imgSrcFileType === 'svg'
        const hasBase64 = imageSourceHref.includes('data:image/svg+xml;base64')

        if (hasSVGFileType || hasBase64) {
          this.type = 'img src'
          this.imgSrcHref = imageSourceHref
        }

        break
      }

      case 'OBJECT': {
        this.type = 'object'
        this.dataSrcHref = (this.originalElementRef as HTMLObjectElement).data
        break
      }

      case 'DIV': {
        const imgElement = this.originalElementRef as HTMLDivElement
        const computedStyle = window.getComputedStyle(imgElement, null)
        const bgImgUrl = computedStyle.backgroundImage
          .slice(4, -1)
          .replace(/"/g, '')

        if (!bgImgUrl) return

        const fileType = bgImgUrl.substr(bgImgUrl.lastIndexOf('.') + 1)
        const isSVGFileType = /(svg)$/gi.test(fileType)

        if (isSVGFileType) {
          this.type = 'bg img'
          this.imgSrcHref = bgImgUrl
        }

        break
      }

      default:
        this.type = 'invalid'
    }
  }

  private buildSymbolElement() {
    if (this.type !== 'symbol') return

    const nameSpace = 'http://www.w3.org/2000/svg'
    const symbolElement = this.originalElementRef.cloneNode(
      true
    ) as SVGSymbolElement

    symbolElement.removeAttribute('fill')

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
      `#${this.originalElementRef.id}`
    )

    svgElement.appendChild(symbolElement)
    svgElement.appendChild(useElement)

    this.type = 'sprite'
    this.originalElementRef = svgElement
  }

  private buildGElement() {
    if (this.type !== 'g') return

    const gElement = this.originalElementRef.cloneNode(true) as SVGGElement
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
    this.originalElementRef = svgElement
  }

  private setSpriteHref() {
    const isSpriteInstance = this.type === 'sprite'
    if (!isSpriteInstance) return

    const useElement = this.originalElementRef.querySelector('use')!
    const spriteHref = useElement.getAttribute('href')

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
