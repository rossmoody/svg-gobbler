import SVG from './svg-class'

function dedupSVGs(svg: SVG, index: number, originalArray: SVG[]) {
  const stringToCompare = svg.svgString

  const firstIndexFound = originalArray.findIndex(
    (currentSvg) => currentSvg.svgString === stringToCompare
  )

  return firstIndexFound === index
}

function convertElementRefToSVGString(svg: SVG): SVG {
  const serializer = new XMLSerializer()
  svg.svgString = serializer.serializeToString(svg.originalElementRef)

  return svg
}

function removeFillNone(this: SVG) {
  const svgElement = this.originalElementRef
  const fill = svgElement.getAttribute('fill')
  const hasFillNone = fill === 'none'

  if (hasFillNone) svgElement.removeAttribute('fill')
}

function removeClass(this: SVG) {
  const svgElement = this.originalElementRef
  svgElement.removeAttribute('class')
}

function setViewBox(this: SVG) {
  const svgElement = this.originalElementRef
  const hasViewbox = svgElement.hasAttribute('viewBox')

  if (hasViewbox) this.viewBox = svgElement.getAttribute('viewBox')!
}

function setWidthHeight(this: SVG) {
  const svgElement = this.originalElementRef

  let width: string | undefined
  let height: string | undefined

  const hasViewbox = Boolean(this.viewBox)
  const hasWidth = svgElement.hasAttribute('width')
  const hasHeight = svgElement.hasAttribute('height')

  if (hasWidth && hasHeight) {
    width = svgElement.getAttribute('width')!
    height = svgElement.getAttribute('height')!
  }

  if (hasViewbox) {
    const viewBoxStringArray = this.viewBox!.split(' ')

    const [, , viewBoxWidth, viewBoxHeight] = viewBoxStringArray

    width = viewBoxWidth
    height = viewBoxHeight
  }

  const hasValidWidthHeight =
    Boolean(width) &&
    Boolean(height) &&
    !width!.includes('%') &&
    !height!.includes('%')

  if (hasValidWidthHeight) {
    width = width!.replace('px', '')
    height = height!.replace('px', '')

    this.width = Math.ceil(parseInt(width, 10))
    this.height = Math.ceil(parseInt(height, 10))
  }
}

function setSize(this: SVG) {
  const hasHeightWidth = Boolean(this.width) && Boolean(this.height)

  this.size = 'N/A'

  if (hasHeightWidth) this.size = `${this.width}x${this.height}`
}

function createPresentationSvg(this: SVG) {
  const htmlElement = this.originalElementRef.cloneNode(true) as HTMLElement

  const isCorsRestricted = this.cors

  if (!isCorsRestricted) {
    const attributes = ['height', 'width', 'style', 'class']
    attributes.forEach((attr) => htmlElement.removeAttribute(attr))
  }

  this.presentationSvg = new XMLSerializer().serializeToString(htmlElement)
}

export {
  dedupSVGs,
  removeFillNone,
  convertElementRefToSVGString,
  setWidthHeight,
  setViewBox,
  setSize,
  removeClass,
  createPresentationSvg,
}
