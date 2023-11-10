import { nanoid } from 'nanoid'

/**
 * The root SVG class. This is the base class for all SVG types.
 */
export class Svg {
  /**
   * A unique identifier
   */
  public id: string

  /**
   * The original string of the SVG element in the DOM.
   * It is processed into an <svg> string through the svg factory.
   *
   * If it fails to do so, it is invalid or cors restricted.
   */
  public originalString: string

  /**
   * The document.location.origin of the SVG element in the DOM
   */
  readonly origin: string

  /**
   * The original string is parsed and assigned to this property as an element.
   * If it is undefined, the SVG factory was unable to parse or
   * manually create the SVG element from parts.
   */
  public asElement?: Element

  /**
   * Defaults to false and only flips true if the element is an
   * image and the fetch fails.
   */
  public corsRestricted = false

  constructor(originalString: string, origin: string) {
    this.id = nanoid()
    this.originalString = originalString
    this.origin = origin
  }

  /**
   * Rebuild the SVG element from the original string
   */
  parseFromString(mimeType: 'image/svg+xml' | 'text/xml') {
    const parser = new DOMParser()
    const { documentElement } = parser.parseFromString(this.originalString, mimeType)

    if (!documentElement.querySelector('parsererror')) {
      return documentElement
    }
  }

  /**
   * Create and return a new empty SVG Element with the correct namespace
   */
  createSvgElement() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/2000/svg')
    return svg
  }

  /**
   * Creates a new empty use element with the correct namespace
   * and href attribute set to the id passed in for the relevant g or symbol
   */
  createUseElement(id: string) {
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${id}`)
    return use
  }

  /**
   * Creates a new empty symbol element with the correct namespace and
   * id attribute set to the id passed in for the relevant g or use
   */
  createSymbolElement(id: string) {
    const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol')
    symbol.id = id
    return symbol
  }

  /**
   * Determines if the SVG element is valid based on if
   * the asElement property is defined.
   */
  get isValid() {
    return !!this.asElement
  }
}
