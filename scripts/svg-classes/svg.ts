import { nanoid } from 'nanoid'

/**
 * The root SVG class. This is the base class for all SVG types. It doesn't actually
 * produce a "valid" SVG element, but it is used to store the original string and
 * origin of the SVG element in the DOM.
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
   * We try everything under the sun to get an SVG element from the original string.
   * If we can't, the asElement property will be undefined and we can't do anything
   * with it.
   */
  get isValid() {
    return !!this.asElement
  }

  /**
   * Return the original SVG stripped of competing styles related to class, explicit height,
   * or explicit width attributes to allow the SVG to scale responsively. Attempts to add
   * a viewBox attribute if one is not present based on width or height.
   *
   * This is used to display the SVG in the DOM and export PNG for scaling.
   */
  get presentationSvg(): string {
    const elementClone = this.asElement?.cloneNode(true) as SVGElement
    const width = elementClone.getAttribute('width')
    const height = elementClone.getAttribute('height')
    const viewBox = elementClone.getAttribute('viewBox')

    elementClone.removeAttribute('height')
    elementClone.removeAttribute('width')
    elementClone.removeAttribute('class') // Tailwind conflicts
    elementClone.removeAttribute('style') // Risky, may remove

    if (!viewBox && width && height) {
      elementClone.setAttribute('viewBox', `0 0 ${width} ${height}`)
    }

    return elementClone.outerHTML
  }
}
