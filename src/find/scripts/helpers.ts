import SVG from './svg-class'

function dedupSVGs(svg: SVG, index: number, originalArray: SVG[]) {
  const stringToCompare = svg.svgString

  const firstIndexFound = originalArray.findIndex(
    (currentSvg) => currentSvg.svgString === stringToCompare
  )

  return firstIndexFound === index
}

function convertElementRefToSVGString(this: SVG) {
  const serializer = new XMLSerializer()
  this.svgString = serializer.serializeToString(this.elementClone)
}

function removeFillNone(this: SVG) {
  const svgElement = this.elementClone

  const fill = svgElement.getAttribute('fill')
  const stroke = svgElement.getAttribute('stroke')

  const hasFillNone = fill === 'none'
  const hasStroke = Boolean(stroke)

  if (hasFillNone && !hasStroke) svgElement.removeAttribute('fill')
}

function removeClass(this: SVG) {
  const svgElement = this.elementClone
  svgElement.removeAttribute('class')
}

function setViewBox(this: SVG) {
  const svgElement = this.elementClone
  const hasViewbox = svgElement.hasAttribute('viewBox')

  if (hasViewbox) this.viewBox = svgElement.getAttribute('viewBox')!
}

function setWidthHeight(this: SVG) {
  const svgElement = this.elementClone

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
  const htmlElement = this.elementClone.cloneNode(true) as HTMLElement

  const isCorsRestricted = this.cors

  if (!isCorsRestricted) {
    const attributes = ['height', 'width', 'style', 'class']
    attributes.forEach((attr) => htmlElement.removeAttribute(attr))
  }

  this.presentationSvg = new XMLSerializer().serializeToString(htmlElement)
}

function hasWhiteFill(this: SVG) {
  const whiteFills = ['#FFF', '#fff', '#FFFFFF', '#ffffff', 'white']
  const svgOuterHtml = this.elementClone.outerHTML
  this.whiteFill = whiteFills.some((fill) => svgOuterHtml.includes(fill))
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
  hasWhiteFill,
}
