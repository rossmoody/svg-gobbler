import { hasSvgBgImg, isRegSVG, addSrcType } from './util'

//////////
// Element finder mechanism
const arrConstructor = (prop) => {
  return Array.from(document.querySelectorAll(prop))
}

export const findSVGs = () => {
  //////////////
  // Collect SVGs
  const svgTags = arrConstructor('svg')
  const objDatas = arrConstructor('object[data*=".svg"]')
  const imgSrcs = arrConstructor('img[src*=".svg"]')
  const svgSprites = arrConstructor('use')
  const pageDivs = arrConstructor('div')

  /////////////
  // Process SVGs and add 'srctype' property
  const regSvg = svgTags.filter(i => isRegSVG(i))
  const objSvg = objDatas.map(i => addSrcType(i, 'objTag'))
  const imgSrc = imgSrcs.map(i => addSrcType(i, 'imgTag'))
  const svgSprite = svgSprites.map(i => addSrcType(i, 'useTag'))
  const bgImg = pageDivs.filter(i => hasSvgBgImg(i))

  ////////////
  // Combine SVG Arrays
  const allSVGs = [...regSvg, ...imgSrc, ...objSvg, ...bgImg, ...svgSprite]
  // console.log(allSVGs)
  return allSVGs
}
