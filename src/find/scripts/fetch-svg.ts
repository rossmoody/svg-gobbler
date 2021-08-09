import SVG from './svg-class'

async function fetchFromUrl(url: string): Promise<HTMLElement | false> {
  try {
    const response = await fetch(url)
    const svgString = await response.text()
    const { documentElement } = new DOMParser().parseFromString(
      svgString,
      'image/svg+xml'
    )

    return documentElement
  } catch (error) {
    return false
  }
}

async function fetchSVGContent(this: SVG): Promise<SVG> {
  const { imgSrcHref, spriteHref, dataSrcHref } = this

  if (imgSrcHref) {
    const imgSrcResponse = await fetchFromUrl(imgSrcHref)

    if (imgSrcResponse) {
      this.elementClone = imgSrcResponse
    } else {
      this.cors = true
    }
  }

  if (spriteHref) {
    const spriteResponse = await fetchFromUrl(spriteHref)

    // Guard for is response fails to return cors svg with cors flag
    if (!spriteResponse) {
      this.cors = true
      return this
    }

    // Query all symbol elements from response
    const symbolElements = Array.from(spriteResponse.querySelectorAll('symbol'))
    const hasSymbolElements = Boolean(symbolElements)

    if (hasSymbolElements) {
      this.spriteSymbolArray = symbolElements
    } else {
      this.elementClone = spriteResponse
    }
  }

  if (dataSrcHref) {
    const dataResponse = await fetchFromUrl(dataSrcHref)

    if (dataResponse) {
      this.elementClone = dataResponse
    } else {
      this.type = 'invalid'
    }
  }

  return this
}

export { fetchSVGContent, fetchFromUrl }
