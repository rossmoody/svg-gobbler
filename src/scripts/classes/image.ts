import { Svg } from './svg'

export class Image extends Svg {
  /**
   * The absolute URL of the image source. If this is present, the SVG
   * is an image element with an external source. It will require a fetch
   * to get the SVG source. If it fails, the image is retained with the cors
   * src url.
   */
  absoluteImageUrl?: string

  /**
   * The document.location.origin of the SVG element in the DOM. Can be blank.
   */
  origin: string

  constructor(
    originalString: string,
    id: string,
    lastModified: string,
    origin: string,
    name: string,
  ) {
    super(originalString, id, lastModified, name)
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
   * Creates an absolute URL from the image src of an image element.
   */
  private getAbsoluteImageSrc() {
    const src = this.asElement?.getAttribute('src') ?? ''
    return src.startsWith('http') ? src : `${this.origin.replace(/\/$/, '')}${src}`
  }

  /**
   * Parses a given HTML string and returns the first element in its body.
   *
   * This function constructs a complete HTML document by embedding the original HTML string (`this.originalString`)
   * inside the body tags. This ensures that the string is parsed in the context of a full HTML document, which can be
   * important for correctly interpreting the HTML structure and any associated resources.
   */
  private parseAndSetElement() {
    const htmlSource = `<!DOCTYPE html><html><head><base href=${this.origin}/></head><body>${this.originalString}</body></html>`

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
    if (!this.absoluteImageUrl) return this

    const controller = new AbortController()
    const signal = controller.signal
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    try {
      const response = await fetch(this.absoluteImageUrl, { mode: 'cors', signal })
      clearTimeout(timeoutId)
      const text = await response.text()
      this.originalString = text
      this.asElement = this.parseFromString()
      this.originalString = this.asElement!.outerHTML
    } catch (error) {
      this.corsRestricted = true
    }

    return this
  }

  processImage() {
    const src = this.originalString.match(/src="([^"]*)"/)?.[1] ?? ''

    switch (true) {
      // Base 64
      case src.includes('data:image/svg+xml;base64'): {
        const base64Index = src.indexOf(',') + 1
        const base64String = src.slice(base64Index, src.length)
        this.originalString = this.base64DecodeUnicode(base64String)
        this.asElement = this.parseFromString()
        break
      }

      // Utf 8
      case src.includes('data:image/svg+xml;utf8'): {
        const svgStart = src.indexOf('<svg')
        const svgEnd = src.lastIndexOf('</svg>') + 6 // 6 is the length of "</svg>"
        const svgString = src.slice(svgStart, svgEnd)
        this.originalString = svgString[0]
        this.asElement = this.parseFromString()
        break
      }

      // URL Encoded SVG
      case src.startsWith('data:image/svg+xml,'): {
        const svgString = decodeURIComponent(src.split(',')[1])
        this.originalString = svgString
        this.asElement = this.parseFromString()
        break
      }

      // Need to fetch asynchronously
      case src.includes('.svg'): {
        this.parseAndSetElement()
        this.absoluteImageUrl = this.getAbsoluteImageSrc()
        break
      }
    }
  }
}
