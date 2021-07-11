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

async function fetchSVGContent(this: SVG) {
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
    const spriteReponse = await fetchFromUrl(spriteHref)

    if (spriteReponse) {
      this.originalElementRef = spriteReponse
    } else {
      this.cors = true
    }
  }

  if (dataSrcHref) {
    const dataResponse = await fetchFromUrl(dataSrcHref)

    if (dataResponse) {
      this.originalElementRef = dataResponse
    } else {
      this.cors = true
    }
  }

  return this
}

export { fetchSVGContent }
