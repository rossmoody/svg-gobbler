import { GElement } from 'scripts/svg-classes/g-element'
import { Image } from 'scripts/svg-classes/image'
import { Inline } from 'scripts/svg-classes/inline'
import { Svg } from 'scripts/svg-classes/svg'

/**
 * Handles the presentation of an SVG in the DOM within cards. It is not used
 * to handle the creation or classification of the SVG itself.
 */
export class CardSvg {
  /**
   * The original element processed in the DOM.
   */
  readonly svg: Svg | Image | Inline | GElement

  constructor(svg: Svg) {
    this.svg = svg
  }

  /**
   * Returns the absolute URL of the SVG. This is used to fetch the SVG from the server
   * if corsRestricted is true. This is only used for SVGs that are images.
   *
   * Defaults to an empty string for redundancy.
   */
  get corsRestrictedUrl(): string {
    return (this.svg as Image).absoluteImageUrl ?? ''
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
