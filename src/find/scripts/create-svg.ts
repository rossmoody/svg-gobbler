import { PageElement } from './find-svgs'

export class SVG {
  originalElementRef: PageElement
  location: string
  cors: boolean
  svgString: string
  presentationSvg: string
  type: string
  size: string
  height?: number
  width?: number
  url?: string
  spriteId?: string

  constructor(element: PageElement) {
    this.originalElementRef = element
    this.location = window.document.location.host
    this.cors = false
    this.svgString = ''
    this.presentationSvg = ''
    this.size = 'N/A'
    this.type = 'invalid'

    this.determineType()
    this.getRects()
    this.determineSize()
    this.buildSpriteString()
  }

  determineType() {
    switch (this.originalElementRef.tagName) {
      case 'svg':
        this.type = 'inline'

        const firstChild = this.originalElementRef.firstElementChild

        if (!firstChild) return

        if (firstChild.tagName === 'use') {
          this.type = 'sprite'

          const spriteId = firstChild.getAttributeNS(
            'http://www.w3.org/1999/xlink',
            'href'
          )

          if (spriteId) this.spriteId = spriteId
        }

        break

      case 'IMG':
        const imgSrc: string | null = (<HTMLImageElement>(
          this.originalElementRef
        )).src

        if (!imgSrc) return

        const imgSrcFileType = imgSrc.split('.').pop()

        if (
          imgSrcFileType === 'svg' ||
          imgSrc.includes('data:image/svg+xml;base64')
        ) {
          this.url = imgSrc
          this.type = 'img src'
        }

        break

      case 'OBJECT':
        this.url = (<HTMLObjectElement>this.originalElementRef).data
        this.type = 'object'

        break

      case 'DIV':
        const style = window.getComputedStyle(
          <HTMLDivElement>this.originalElementRef,
          null
        )
        const url = style.backgroundImage.slice(4, -1).replace(/"/g, '')
        const fileType = url.substr(url.lastIndexOf('.') + 1)

        if (style.backgroundImage !== 'none' && /(svg)$/gi.test(fileType)) {
          this.url = url
          this.type = 'bg img'
        }

        break

      default:
        this.type = 'invalid'
    }
  }

  getRects() {
    const rects = this.originalElementRef.getBoundingClientRect()
    this.height = Math.ceil(rects.height)
    this.width = Math.ceil(rects.width)
  }

  buildSpriteString() {
    if (!this.spriteId) return

    const parentSvg = <SVGElement>this.originalElementRef.cloneNode(true)
    const useSvgElement = parentSvg.querySelector('use')
    const symbolElement = window.document.querySelector(
      `[id='${this.spriteId}']`
    )

    if (useSvgElement && symbolElement) {
      const clonedSymbolElement = symbolElement.cloneNode(true)
      useSvgElement.appendChild(clonedSymbolElement)
    }

    this.originalElementRef = parentSvg
  }

  determineSize() {
    this.size = `${this.width}x${this.height}`

    if (this.width === 0 || this.height === 0) {
      this.size = 'N/A'
    }
  }

  async fetchSvg() {
    const serializer = new XMLSerializer()

    if (!this.url) {
      this.svgString = serializer.serializeToString(this.originalElementRef)
    } else {
      try {
        const response = await fetch(this.url)
        this.svgString = await response.text()
      } catch (error) {
        this.cors = true
        this.svgString = serializer.serializeToString(this.originalElementRef)
      }
    }

    return this
  }

  createPresentationSvg() {
    const doc = new DOMParser().parseFromString(this.svgString, 'image/svg+xml')
    const presentationSvg = doc.documentElement

    presentationSvg.removeAttribute('height')
    presentationSvg.removeAttribute('width')
    presentationSvg.removeAttribute('style')
    presentationSvg.removeAttribute('class')

    if (
      presentationSvg.nodeName === 'svg' &&
      !presentationSvg.hasAttribute('viewBox')
    ) {
      presentationSvg.setAttribute(
        'viewBox',
        `0 0 ${this.width} ${this.height}`
      )
    }

    this.presentationSvg = new XMLSerializer().serializeToString(
      presentationSvg
    )

    return this
  }

  isValidSvg() {
    return this.type !== 'invalid'
  }
}

export default SVG
