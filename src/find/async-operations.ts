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
  const { imgSrcHref, spriteHref, dataSrcHref, divBgUrl } = this

  if (imgSrcHref) {
    const imgSrcResponse = await fetchFromUrl(imgSrcHref)
    console.log(imgSrcResponse)
    if (imgSrcResponse) {
      this.originalElementReference = imgSrcResponse
    } else {
      // Set the src url explicitly so it isn't broken with relative //
      ;(this.originalElementReference as HTMLImageElement).src =
        this.imgSrcHref!
      this.cors = true
    }
  }

  if (divBgUrl) {
    const bgUrlResponse = await fetchFromUrl(divBgUrl)

    if (bgUrlResponse) {
      this.originalElementReference = bgUrlResponse
    } else {
      this.cors = true
    }
  }

  if (spriteHref) {
    const spriteResponse = await fetchFromUrl(spriteHref)

    if (spriteResponse) {
      // Query all symbol elements from response
      const symbolElements = Array.from(
        spriteResponse.querySelectorAll('symbol')
      )
      const hasSymbolElements = Boolean(symbolElements)

      if (hasSymbolElements) {
        this.spriteSymbolArray = symbolElements
      } else {
        this.originalElementReference = spriteResponse
      }
    } else {
      this.cors = true
    }
  }

  if (dataSrcHref) {
    const dataResponse = await fetchFromUrl(dataSrcHref)

    if (dataResponse) {
      this.originalElementReference = dataResponse
    } else {
      this.type = 'invalid'
    }
  }

  return this
}

export default fetchSVGContent
