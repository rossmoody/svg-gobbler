import { hasBgImg, isRegSVG, addSrcType } from './util'

// find all the svgs
export const findSVGs = () => {
  //////////////
  // Collect SVGs
  const svgTags = Array.from(document.querySelectorAll('svg'))
  const objDatas = Array.from(document.querySelectorAll('object[data*=".svg"]'))
  const imgSrcs = Array.from(document.querySelectorAll('img[src*=".svg"]'))
  const svgSprites = Array.from(document.querySelectorAll('use'))
  const bgImgUrls = Array.from(document.querySelectorAll('div'))

  /////////////
  // Process SVGs
  const regSvg = svgTags.filter(isRegSVG)
  const objSvg = objDatas.map(i => addSrcType(i, 'objTag'))
  const bgImg = bgImgUrls.filter(hasBgImg)
  const imgSrc = imgSrcs.map(i => addSrcType(i, 'imgTag'))
  const svgSprite = svgSprites.map(i => addSrcType(i, 'useTag'))

  ////////////
  // Concat SVG Arrays
  const allSVGs = regSvg.concat(imgSrc, objSvg, bgImg, svgSprite)
  console.log(allSVGs)
  return allSVGs
}
