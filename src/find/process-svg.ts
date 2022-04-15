import SVG from './SVG'

const process = {
  setWidthHeight(this: SVG) {
    const svgElement = this.element
    const viewBox = this.viewBox
    const width: string | null = svgElement.getAttribute('width')
    const height: string | null = svgElement.getAttribute('height')

    if (viewBox) {
      const viewBoxStringArray = this.viewBox!.split(' ')
      const [, , viewBoxWidth, viewBoxHeight] = viewBoxStringArray

      this.width = Math.ceil(parseInt(viewBoxWidth, 10))
      this.height = Math.ceil(parseInt(viewBoxHeight, 10))
    }

    const hasValidWidthHeight =
      width && height && !width.includes('%') && !height.includes('%')

    if (hasValidWidthHeight) {
      const validWidth = width!.replace('px', '')
      const validHeight = height!.replace('px', '')

      this.width = Math.ceil(parseInt(validWidth, 10))
      this.height = Math.ceil(parseInt(validHeight, 10))

      if (!viewBox) {
        this.viewBox = `0 0 ${validWidth} ${validHeight}`
      }
    }
  },

  processSvgSymbolsFromFetchCall(this: SVG) {
    if (this.spriteSymbolArray) {
      console.log(this.spriteSymbolArray, 'sprite symbol array!')
      return this.spriteSymbolArray.map(
        (symbol) => new SVG(symbol, this.location)
      )
    } else {
      return this
    }
  },
}

export default process
