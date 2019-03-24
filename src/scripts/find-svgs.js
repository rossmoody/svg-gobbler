export const findSVGs = () => {
  // Collect all SVG content
  const svgTagLoc = Array.from(document.querySelectorAll('svg'))
  const svgObjLoc = Array.from(
    document.querySelectorAll('object[data*=".svg"]')
  )
  const svgImgLoc = Array.from(document.querySelectorAll('img[src*=".svg"]'))
  const allSVGs = svgTagLoc.concat(svgImgLoc, svgObjLoc)
  return allSVGs
}
