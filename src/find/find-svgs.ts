/**
 * Returns an array of unique element strings that
 * include 'svg' somewhere in the string. Must be a single function
 * scope for v3 manifest security.
 */
function findSVGs() {
  /**
   * Background image urls must be determined in the DOM where
   * they are placed. This creates a new img with it set as the src.
   */
  const parseBgImageElements = () => {
    const results: string[] = []
    const elements = Array.from(document.querySelectorAll('div'))

    elements.forEach((element) => {
      const style = window.getComputedStyle(element)
      const src = style.backgroundImage.slice(4, -1).replace(/"/g, '')

      if (src.includes('svg')) {
        const image = new Image()
        image.src = src
        results.push(image.outerHTML)
      }
    })

    return results
  }

  /**
   * Returns the outerhtml of a specified tag that includes
   * 'svg' in the string.
   */
  const getElementsByTag = (
    tag: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap,
  ) =>
    Array.from(document.querySelectorAll(tag))
      .map((element) => element.outerHTML)
      .filter((element) => element.includes('svg'))

  return [
    ...new Set([
      ...parseBgImageElements(),
      ...getElementsByTag('svg'),
      ...getElementsByTag('symbol'),
      ...getElementsByTag('img'),
      ...getElementsByTag('g'),
    ]),
  ]
}

export default findSVGs
