function hasSvgBgImg ( el ) {
  let style = window.getComputedStyle( el, null )
  let url = style.backgroundImage.slice( 4, -1 ).replace( /"/g, '' )
  let fileType = url.substr( url.lastIndexOf( '.' ) + 1 )
  if ( style.backgroundImage !== 'none' && /(svg)$/gi.test( fileType ) ) {
    el.url = url
    el.type = 'bgImg'
    return el
  }
}

function addSrcType ( el, srcType ) {
  el.type = srcType
  if ( el.tagName === 'IMG' ) {
    el.url = el.src
    return el
  } else if ( el.tagName === 'OBJECT' ) {
    el.url = el.data
    return el
  }
}

function removeDups ( arr, comp ) {
  const unique = arr
    .map( e => e[ comp ] )

    // store the keys of the unique objects
    .map( ( e, i, final ) => final.indexOf( e ) === i && i )

    // eliminate the dead keys & store unique objects
    .filter( e => arr[ e ] ).map( e => arr[ e ] );

  return unique;
}

class SVG {
  constructor ( ele, id, url = null, type = 'svg' ) {
    this.ele = ele
    this.id = id
    this.url = url
    this.type = type
  }
  getXML () {
    let ajax = new XMLHttpRequest()
    let serializer = new XMLSerializer()
    let parser = new DOMParser()

    if ( this.url ) {
      return new Promise( resolve => {
        ajax.open( 'GET', this.url, true )
        ajax.send()
        ajax.onload = () => {
          let xml = parser.parseFromString( ajax.responseText, 'image/svg+xml' )
            .children[ 0 ]
          let string = serializer.serializeToString( xml )
          this.svgXml = xml
          this.svgString = string
          resolve()
        }
      } )
    } else {
      const string = serializer.serializeToString( this.ele )
      this.svgString = string
      this.svgXml = this.ele
    }
  }
  cleanupXML () {
    let rects = this.ele.getBoundingClientRect()
    let viewBoxHeight = rects.width
    let viewBoxWidth = rects.height

    this.cleanXml = this.svgXml.cloneNode( true )
    this.cleanXml.setAttribute( 'class', 'gobbler__card__clone__wrapper__svg' )
    this.cleanXml.removeAttribute( 'height' )
    this.cleanXml.removeAttribute( 'width' )
    this.cleanXml.removeAttribute( 'style' )
    this.cleanXml.hasAttribute( 'viewBox' ) ? '' : this.cleanXml.setAttribute( 'viewBox', `0 0 ${ viewBoxHeight } ${ viewBoxWidth }` )
    this.cleanXml.getAttribute( 'viewBox' ) === '0 0 0 0' ? this.cleanXml.setAttribute( 'viewBox', `0 0 24 24` ) : ''
    this.cleanXml.setAttribute( 'preserveAspectRatio', 'xMidYMid meet' )
  }
}


export async function findSVGs () {
  let svgTags = Array.from( document.querySelectorAll( 'svg' ) )
  let objDatas = Array.from( document.querySelectorAll( 'object[data*=".svg"]' ) )
  let imgSrcs = Array.from( document.querySelectorAll( 'img[src*=".svg"]' ) )
  let pageDivs = Array.from( document.querySelectorAll( 'div' ) )

  pageDivs = pageDivs.filter( i => hasSvgBgImg( i ) )
  objDatas = objDatas.map( i => addSrcType( i, 'obj' ) )
  imgSrcs = imgSrcs.map( i => addSrcType( i, 'img' ) )

  let allSVGs = [ ...svgTags, ...imgSrcs, ...objDatas, ...pageDivs ]

  allSVGs = allSVGs.map( async ( i, index ) => {
    const newEl = new SVG( i, index, i.url, i.type )
    await newEl.getXML()
    newEl.cleanupXML()
    return newEl
  } )
  allSVGs = await Promise.all( allSVGs )
  const finalSVGs = removeDups( allSVGs, 'svgString' )
  return finalSVGs
}
