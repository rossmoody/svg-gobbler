import { PageElement } from './find-svgs'

type SVGType =
  | 'inline'
  | 'object'
  | 'sprite master'
  | 'sprite instance'
  | 'symbol'
  | 'img src'
  | 'object'
  | 'bg img'
  | 'invalid'

export class SVGClass {
  originalElementRef: PageElement
  type: SVGType = 'invalid'
  cors = false

  spriteHref?: string
  imgSrcHref?: string
  dataSrcHref?: string
  svgString?: string

  readonly location = window.document.location.host
  readonly id = Math.random()

  constructor(element: PageElement) {
    this.originalElementRef = element.cloneNode(true) as HTMLElement
    this.determineType()
    this.buildSymbolElement()
    this.setSpriteHref()
  }

  private determineType() {
    const tagName = this.originalElementRef.tagName

    switch (tagName) {
      case 'svg': {
        this.type = 'inline'

        const children = [...this.originalElementRef.children]

        const hasUseOrImgTag = children.some(
          (child) => child.tagName === 'use' || child.tagName === 'img'
        )

        const hasSymbolChildren = children.some(
          (element) => element.tagName === 'symbol'
        )

        if (hasUseOrImgTag) this.type = 'sprite instance'
        if (hasSymbolChildren) this.type = 'sprite master'

        break
      }

      case 'symbol': {
        this.type = 'symbol'

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

    // Reassign type to sprite instance so it can be processed
    this.type = 'sprite instance'
    this.originalElementRef = svgElement
  }

  private setSpriteHref() {
    const isSpriteInstance = this.type === 'sprite instance'

    if (!isSpriteInstance) return

    const useElement = this.originalElementRef.querySelector('use')!
    const spriteHref = useElement.getAttribute('href')

    if (spriteHref && spriteHref.includes('.svg')) this.spriteHref = spriteHref
  }
}

export default SVGClass
