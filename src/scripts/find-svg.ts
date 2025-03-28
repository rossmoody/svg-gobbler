import type { DocumentData } from './types'

/**
 * Gathers all relevant SVG data from a given document. Must be isolated self containing
 * function to make Chrome Manifest V3 security happy.
 */
export function findSvg(documentParam?: Document): DocumentData {
  /**
   * The document to search for SVGs. Defaults to window.document.
   */
  const document = documentParam ?? window.document

  /**
   * Helper function to quickly create a new image, set the src, and return the outerHTML
   * created by it. We must do this because security is quite strict on what we can access
   * from the client page so this strips out all the sensitive data.
   *
   * We also centralize the async srcs, base64 srcs, and data urls to one element type.
   *
   */
  const createImage = (src: string) => {
    const image = new Image()
    image.src = src
    return image.outerHTML
  }

  /**
   * Find all the elements with src or background images that contain svg
   */
  const parseSrcAndBgImages = () => {
    const results: string[] = []
    const elements = document.querySelectorAll('*')

    elements.forEach((element) => {
      if (element instanceof HTMLImageElement && element.src.includes('.svg')) {
        results.push(createImage(element.src))
        return
      }

      const backgroundImage = window.getComputedStyle(element).backgroundImage
      if (element instanceof HTMLElement && backgroundImage.includes('.svg')) {
        const url = backgroundImage.slice(5, -2)
        results.push(createImage(url))
        return
      }

      if (element instanceof HTMLImageElement && element.src.includes('data:image/svg+xml')) {
        results.push(createImage(element.src))
        return
      }

      if (element instanceof HTMLObjectElement && element.type === 'image/svg+xml') {
        results.push(createImage(element.data))
        return
      }

      if (element instanceof HTMLEmbedElement && element.type === 'image/svg+xml') {
        results.push(createImage(element.src))
        return
      }

      if (element instanceof HTMLIFrameElement && element.src.includes('.svg')) {
        results.push(createImage(element.src))
        return
      }
    })

    return results
  }

  const gatherInlineSvgElements = () => {
    return [...document.querySelectorAll('svg')]
      .filter((svg) => !svg.querySelector('use, symbol'))
      .map(({ outerHTML }) => outerHTML)
  }

  const gatherGElements = () => {
    return [...document.querySelectorAll('g')].map(({ outerHTML }) => outerHTML)
  }

  const gatherSymbolElements = () => {
    return [...document.querySelectorAll('symbol')].map(({ outerHTML }) => outerHTML)
  }

  const gatherUseElements = () => {
    const results: string[] = []
    const elements = document.querySelectorAll('use')

    // Checking for use elements that call to a remote sprite source
    elements.forEach((element) => {
      const href = element.getAttribute('href')
      if (href?.includes('.svg')) {
        results.push(createImage(href))
      }

      const xLinkHref = element.getAttribute('xlink:href')
      if (xLinkHref?.includes('.svg')) {
        results.push(createImage(xLinkHref))
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
      ...gatherUseElements(),
    ]),
  ]

  return {
    href: document.location.href ?? '',
    host: document.location?.host ?? '',
    origin: document.location?.origin ?? '',
    data: data.map((svg) => {
      const id = crypto.randomUUID().slice(0, 8)
      return { id, lastEdited: new Date().toISOString(), svg, name: id }
    }),
  }
}
