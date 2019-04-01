/////////////
// Checks if SVG is inline or a sprite that xlinks via 'use' tag
function isRegSVG ( el ) {
  const inner = el.innerHTML
  if ( inner.includes( '<use' ) ) {
    addSrcType( el, 'useTag' )
    return el
  } else {
    addSrcType( el, 'svgTag' )
    return el
  }
}

///////////
// Checks if the element bas a backgroung image that
// is of type 'svg'. This currently checks all divs on the page
// This seems like it could be optimized
function hasSvgBgImg ( el ) {
  let style = window.getComputedStyle( el, null )
  let url = style.backgroundImage.slice( 4, -1 ).replace( /"/g, '' )
  let fileType = url.substr( url.lastIndexOf( '.' ) + 1 )
  if ( style.backgroundImage !== 'none' && /(svg)$/gi.test( fileType ) ) {
    el.bgImgUrl = url
    el.srctype = 'bgImg'
    return el
  }
}

//////////////
// Sets the srctype property when mapping the global array
function addSrcType ( i, srcType ) {
  i.srctype = srcType
  return i
}



//////////
// Array creator
function arrConstructor ( prop ) {
  return Array.from( document.querySelectorAll( prop ) )
}

//////////////
// Collect SVG Elements
export function findSVGs () {
  const svgTags = arrConstructor( 'svg' )
  const objDatas = arrConstructor( 'object[data*=".svg"]' )
  const imgSrcs = arrConstructor( 'img[src*=".svg"]' )
  const pageDivs = arrConstructor( 'div' )

  /////////////
  // Process SVGs and add 'srctype' property
  const bgImg = pageDivs.filter( i => hasSvgBgImg( i ) )
  const objSvg = objDatas.map( i => addSrcType( i, 'objTag' ) )
  const imgSrc = imgSrcs.map( i => addSrcType( i, 'imgTag' ) )
  const regSvg = svgTags.map( i => isRegSVG( i ) )

  ////////////
  // Combine SVG Arrays
  let allSVGs = [ ...regSvg, ...imgSrc, ...objSvg, ...bgImg ]
  return allSVGs
}
