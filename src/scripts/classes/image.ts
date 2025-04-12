import { StorageSvg } from '../types'
import { Svg } from './svg'

export class Image extends Svg {
  /**
   * The document.location.origin of the SVG element in the DOM. Can be blank.
   */
  origin: string

  constructor(storageSvg: StorageSvg, origin: string) {
    super(storageSvg)
    this.origin = origin
    this.processImage()
  }

  /**
   * * Decodes a base64-encoded Unicode string.
   *
   * This function first decodes the base64 string using the built-in `atob` function.
   * It then splits the resulting string into an array of characters and encodes each character
   * into its hexadecimal representation. The encoded characters are then assembled into a string
   * and decoded using `decodeURIComponent` to handle any special Unicode characters.
   */
  private base64DecodeUnicode(str: string): string {
    try {
      return decodeURIComponent(
        atob(str)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      )
    } catch (error) {
      return str
    }
  }

  /**
   * The absolute URL of the image source. If this is present, the SVG
   * is an image element with an external source. It will require a fetch
   * to get the SVG source. If it fails, the image is retained with the cors
   * src url.
   */
  public get absoluteImageUrl() {
    const src = this.asElement?.getAttribute('src') ?? ''

    // Handle various URL formats
    if (src.startsWith('data:')) {
      return src
    } else if (src.startsWith('http://') || src.startsWith('https://')) {
      return src
    } else if (src.startsWith('//')) {
      return `https:${src}`
    } else if (src.startsWith('www.')) {
      return `https://${src}`
    } else if (src.startsWith('/')) {
      return `${this.origin.replace(/\/$/, '')}${src}`
    } else {
      return `${this.origin.replace(/\/$/, '')}/${src.replace(/^\.\//, '')}`
    }
  }

  /**
   * Parses a given HTML string and returns the first element in its body.
   *
   * This function constructs a complete HTML document by embedding the original HTML string (`this.originalString`)
   * inside the body tags. This ensures that the string is parsed in the context of a full HTML document, which can be
   * important for correctly interpreting the HTML structure and any associated resources.
   */
  private parseAndSetElement() {
    const htmlSource = `<!DOCTYPE html><html><head><base href="${this.origin.replace(/"/g, '&quot;')}/"></head><body>${this.svg}</body></html>`

    try {
      const element = new DOMParser().parseFromString(htmlSource, 'text/html')

      if (!element.body.firstElementChild || element.querySelector('parsererror')) {
        console.error('Parsing error in parseAndSetElement')
        return
      }

      this.asElement = element.body.firstElementChild as Element
    } catch (error) {
      console.error('Error in parseAndSetElement:', error)
    }
  }

  /**
   *
   */
  async fetchSvgContent() {
    const controller = new AbortController()
    const signal = controller.signal
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    try {
      const response = await fetch(this.absoluteImageUrl, {
        headers: {
          Accept: 'image/svg+xml, text/xml, application/xml, */*',
        },
        mode: 'cors',
        signal,
      })
      clearTimeout(timeoutId)

      if (!response.ok) {
        this.corsRestricted = true
        return this
      }

      const text = await response.text()
      this.svg = text

      const element = this.parseFromString()
      if (element) {
        this.asElement = element
        this.svg = this.asElement.outerHTML
      }
    } catch (error) {
      this.corsRestricted = true
    }

    return this
  }

  processImage() {
    // Early return if the SVG has already been processed and proven to be CORS restricted
    // This is a massive performance imrprovement as we process SVGs in and out twice every load
    if (this.corsRestricted) return

    // Support both double and single quotes in src attribute
    const srcMatch = this.svg.match(/src=["']([^"']*)["']/)
    const src = srcMatch ? srcMatch[1] : ''

    // If no src found but the content appears to be direct SVG
    if (!src && this.svg.includes('<svg') && this.svg.includes('</svg>')) {
      this.asElement = this.parseFromString()
      return
    }

    switch (true) {
      // Base 64
      case src.includes('data:image/svg+xml;base64'): {
        const base64Index = src.indexOf(',') + 1
        const base64String = src.slice(base64Index, src.length)
        this.svg = this.base64DecodeUnicode(base64String)
        this.asElement = this.parseFromString()
        break
      }

      // Utf 8
      case src.includes('data:image/svg+xml;utf8'): {
        const svgStart = src.indexOf('<svg')
        const svgEnd = src.lastIndexOf('</svg>') + 6 // 6 is the length of "</svg>"
        if (svgStart >= 0 && svgEnd > svgStart) {
          const svgString = src.slice(svgStart, svgEnd)
          this.svg = svgString // Fix: this was using only first character with [0]
          this.asElement = this.parseFromString()
        }
        break
      }

      // URL Encoded SVG
      case src.startsWith('data:image/svg+xml,'): {
        try {
          const svgString = decodeURIComponent(src.split(',')[1])
          this.svg = svgString
          this.asElement = this.parseFromString()
        } catch (error) {
          console.warn('Error decoding URL-encoded SVG:', error)
        }
        break
      }

      // Need to fetch asynchronously
      case src.endsWith('.svg') ||
        src.includes('.svg?') ||
        src.includes('/svg/') ||
        src.includes('.svg#'): {
        this.parseAndSetElement()
        break
      }

      default: {
        this.parseAndSetElement()
      }
    }
  }
}
