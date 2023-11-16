import type { PageData } from 'src/types'

/**
 * Gathers all relevant SVG data from the active tab. Must be isolated self containing
 * function to make Chrome Manifest V3 security happy.
 *
 * The general strategy is to:
 * 1. Try to find SVG elements in a given page in all the ways they can be rendered
 * 2. Try to determine the size of the SVG and set it as a viewBox so the SVG can be scaled proportionally
 */
export function gatherPageData() {
  /**
   * Find all the elements with src or background images that contain svg
   */
  const parseSrcAndBgImages = () => {
    const results: string[] = []
    const elements = document.querySelectorAll(
      'img[src*="svg"], object[type="image/svg+xml"], embed[type="image/svg+xml"], iframe[src*="svg"]',
    )

    /**
     * Helper function to quickly create a new image, set the src,
     * and return the outerHTML created by it. We must do this because
     * security is quite strict on what we can access from the client page.
     *
     */
    const createImage = (src: string) => {
      const image = new Image()
      image.src = src
      return image.outerHTML
    }

    elements.forEach((element) => {
      if (element instanceof HTMLImageElement && element.src.includes('svg')) {
        results.push(createImage(element.src))
      }

      if (element instanceof HTMLElement && element.style.backgroundImage.includes('svg')) {
        const url = window.getComputedStyle(element).backgroundImage.slice(5, -2)
        results.push(createImage(url))
      }

      if (element instanceof HTMLObjectElement && element.type === 'image/svg+xml') {
        results.push(createImage(element.data))
      }

      if (element instanceof HTMLEmbedElement && element.type === 'image/svg+xml') {
        results.push(createImage(element.src))
      }

      if (element instanceof HTMLIFrameElement && element.src.includes('svg')) {
        results.push(createImage(element.src))
      }
    })

    return results
  }

  /**
   * Find all the inline svg elements that are not sprite instances or sprite sources
   */
  const gatherInlineSvgElements = () => {
    const results: string[] = []
    const elements = document.querySelectorAll('svg')

    /**
     * An earnest effort to set a viewBox so we can handle resizing and displaying the SVGs
     */
    const tryToSetViewBox = (svg: SVGElement) => {
      const viewBox = svg.getAttribute('viewBox')

      if (viewBox) {
        return svg.outerHTML
      }

      const cloneSvg = svg.cloneNode(true) as SVGSVGElement
      const height = svg.getAttribute('height')
      const width = svg.getAttribute('width')

      if (height && width) {
        cloneSvg.setAttribute('viewBox', `0 0 ${width} ${height}`)
        return cloneSvg.outerHTML
      }

      // Use Bounding Box as last resort
      const boundingBox = cloneSvg.getBBox()
      cloneSvg.setAttribute(
        'viewBox',
        `${boundingBox.x} ${boundingBox.y} ${boundingBox.width} ${boundingBox.height}`,
      )
      return svg.outerHTML
    }

    elements.forEach((element) => {
      if (element instanceof SVGElement) {
        results.push(tryToSetViewBox(element))
      }
    })

    return results
  }

  /**
   * Find all the g elements on the page and try to establish their canvas size
   * so we can set a viewBox when processing them into SVGs. Setting a viewBox here is
   * meaningless to the element, but we parse and remove it later in the class constructor.
   */
  const gatherGElements = () => {
    const results: string[] = []
    const elements = document.querySelectorAll('g')

    elements.forEach((element) => {
      const svg = element.closest('svg')
      const gClone = element.cloneNode(true) as SVGGElement

      const viewBox = svg?.getAttribute('viewBox')
      if (viewBox) {
        gClone.setAttribute('viewBox', viewBox)
        return results.push(gClone.outerHTML)
      }

      const width = svg?.getAttribute('width')?.replace('px', '')
      const height = svg?.getAttribute('height')?.replace('px', '')
      if (width && height) {
        gClone.setAttribute('viewBox', `0 0 ${width} ${height}`)
        return results.push(gClone.outerHTML)
      }

      // Use Bounding Box as last resort
      const boundingBox = element.getBBox()
      gClone.setAttribute(
        'viewBox',
        `${boundingBox.x} ${boundingBox.y} ${boundingBox.width} ${boundingBox.height}`,
      )

      results.push(gClone.outerHTML)
    })

    return results
  }

  /**
   * Gather all the symbol elements on the page and try to establish a viewBox
   */
  const gatherSymbolElements = () => {
    const results: string[] = []
    const elements = document.querySelectorAll('symbol')

    elements.forEach((element) => {
      if (element.getAttribute('viewBox')) {
        return results.push(element.outerHTML)
      }

      const svgViewBox = element.closest('svg')?.getAttribute('viewBox')
      if (svgViewBox) {
        const cloneElement = element.cloneNode(true) as SVGElement
        cloneElement.setAttribute('viewBox', svgViewBox)
        return results.push(cloneElement.outerHTML)
      }

      const height = element.getAttribute('height')
      const width = element.getAttribute('width')
      if (height && width) {
        const cloneElement = element.cloneNode(true) as SVGElement
        cloneElement.setAttribute('viewBox', `0 0 ${width} ${height}`)
        return results.push(cloneElement.outerHTML)
      }
    })

    return results
  }

  const data = [
    ...new Set([
      ...parseSrcAndBgImages(),
      ...gatherInlineSvgElements(),
      ...gatherGElements(),
      ...gatherSymbolElements(),
    ]),
  ]

  return {
    data,
    host: document.location.host,
    origin: document.location.origin,
  } as PageData
}
