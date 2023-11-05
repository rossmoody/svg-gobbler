import { GElement } from './g-element'
import { Image } from './image'
import { Inline } from './inline'
import { Svg } from './svg'

/**
 * A concise helper class for using SVGs we generate in the browser.
 */
export class PresentationSvg {
  /**
   * The SVG element.
   */
  private svg: Svg | Image | Inline | GElement

  constructor(svg: Svg) {
    this.svg = svg
  }

  /**
   * Returns true if the SVG is an image element. We process all SVGs and try every method
   * to get at the SVG string. If the SVG is still an image element, the fetch failed due to CORS restrictions.
   * We show the SVG as an image element.
   */
  get isCorsRestricted(): boolean {
    return this.svg.asElement instanceof HTMLImageElement
  }

  /**
   * Returns the absolute URL of the SVG. This is used to fetch the SVG from the server
   * if corsRestricted is true. This is only used for SVGs that are images.
   *
   * Defaults to an empty string for redundancy.
   */
  get corsRestrictedUrl(): string {
    if (this.svg instanceof Image) return this.svg.absoluteImageUrl ?? ''
    return ''
  }

  /**
   * Guaranteed to be the original string of the SVG found in the dom.
   */
  get originalString(): string {
    return this.svg.originalString
  }

  /**
   * Return the original SVG stripped of competing styles related to class, height,
   * or width attributes to allow the SVG to scale. Attempts to add a viewBox attribute
   * if one is not present.
   */
  get presentationSvg(): string {
    const element = this.svg.asElement?.cloneNode(true) as SVGElement
    const width = element.getAttribute('width')
    const height = element.getAttribute('height')
    const viewBox = element.getAttribute('viewBox')

    if (!viewBox && width && height) {
      element.setAttribute('viewBox', `0 0 ${width} ${height}`)
    }

    element.removeAttribute('height')
    element.removeAttribute('width')
    element.removeAttribute('class') // Tailwind conflicts
    element.removeAttribute('style') // Risky, may remove

    return element.outerHTML
  }
}
