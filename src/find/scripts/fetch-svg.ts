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
      this.originalElementRef = imgSrcResponse
    } else {
      this.cors = true
    }
  }

  if (spriteHref) {
    const spriteResponse = await fetchFromUrl(spriteHref)

    if (spriteResponse) {
      const children = Array.from(spriteResponse.children)
      const hasSymbolChildren = children.some(
        (element) => element.tagName === 'symbol'
      )

      if (hasSymbolChildren) {
        const symbols = children.filter(
          (elements) => elements.tagName === 'symbol'
        )

        this.spriteSymbolArray = symbols as SVGSymbolElement[]
      } else {
        this.originalElementRef = spriteResponse
      }
    } else {
      this.cors = true
    }
  }

  if (dataSrcHref) {
    const dataResponse = await fetchFromUrl(dataSrcHref)

    if (dataResponse) {
      this.originalElementRef = dataResponse
    } else {
      this.type = 'invalid'
    }
  }

  return this
}

export { fetchSVGContent }
