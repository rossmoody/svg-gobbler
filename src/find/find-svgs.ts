/**
 * Returns an array of unique element strings that
 * include 'svg' somewhere in the string. Must be a single function
 * scope for v3 manifest security.
 */
function findSVGs() {
  /**
   * Background image urls must be parsed in the DOM window where
   * they are placed. This creates a new img with it set as the src.
   */
  const parseBgImageElements = () => {
    const imagesWithSrc = [] as string[]
    const documentElements = Array.from(document.querySelectorAll('div'))

    documentElements.forEach((element) => {
      const style = window.getComputedStyle(element)
      const src = style.backgroundImage.slice(4, -1).replace(/"/g, '')

      if (src.includes('svg')) {
        const image = new Image()
        image.src = src
        imagesWithSrc.push(image.outerHTML)
      }
    })

    return imagesWithSrc
  }

  type TagNameMap = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap

  /**
   * Returns the outer html of a specified tag that includes
   * 'svg' or '<g ' in the string.
   */
  function getElementsByTag(tag: TagNameMap) {
    return Array.from(document.querySelectorAll(tag))
      .map((element) => element.outerHTML)
      .filter((element) => element.includes('svg') || element.includes('<g '))
  }

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
