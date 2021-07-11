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

export { dedupSVGs, convertElementRefToSVGString }
