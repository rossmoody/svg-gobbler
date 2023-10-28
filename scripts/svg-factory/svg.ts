export class Svg {
  /**
   * The original string of the SVG element in the DOM
   */
  readonly originalString: string

  /**
   * The document.location.origin of the SVG element in the DOM
   */
  readonly origin: string

  /**
   * The SVG element will be parsed into this element.
   * If it is undefined, the SVG factory was unable to parse or
   * manually create the SVG element from parts.
   */
  public asElement?: Element

  constructor(originalString: string, origin: string) {
    this.originalString = originalString
    this.origin = origin
  }

  /**
   * Determines if the SVG element is valid based on if
   * the asElement property is defined.
   */
  get isValid() {
    return !!this.asElement
  }
}
