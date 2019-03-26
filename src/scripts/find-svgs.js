import { hasBgImg } from './util'

// find all the svgs
export const findSVGs = () => {
  const svgTag = Array.from(document.querySelectorAll('svg'))
  const objData = Array.from(document.querySelectorAll('object[data*=".svg"]'))
  const imgSrc = Array.from(document.querySelectorAll('img[src*=".svg"]'))
  const bgImgUrls = Array.from(document.querySelectorAll('div'))
  const svgBgImgs = bgImgUrls.filter(hasBgImg)

  const allSVGs = svgTag.concat(imgSrc, objData, svgBgImgs)
  return allSVGs
}
