const ajaxCall = ( el, elSvg ) => {
  return new Promise(function (resolve) {
    let ajax = new XMLHttpRequest()
    let serializer = new XMLSerializer()
    let parser = new DOMParser()

    ajax.open( 'GET', elSvg, true )
    ajax.send()
    ajax.onload = function ( e ) {
      let xml = parser.parseFromString( ajax.responseText, 'image/svg+xml' )
        .children[ 0 ]
      const string = serializer.serializeToString( xml )
      el.source = string
      resolve()
    }
  })
}

///////////////////////
// Requests, parses and serializes SVG information
// using different methods based on how it's positioned
// in the DOM (bgImg, imgSrc, inline SVG, sprite, object)
export function getSources ( svgInfo ) {
  let svgSourceOperations = svgInfo.map(async (i) => {
    let serializer = new XMLSerializer()
    if ( i.srctype === 'imgTag' ) {
      await ajaxCall( i, i.src )
      return i
    } else if ( i.srctype === 'bgImg' ) {
      await ajaxCall( i, i.bgImgUrl )
      return i
    } else if ( i.srctype === 'useTag' ) {
      let href = i.firstElementChild.href.baseVal
      await ajaxCall( i, href )
      return i
    } else if ( i.srctype === 'objTag' ) {
      await ajaxCall( i, i.data )
      return i
    } else if ( i.srctype === 'svgTag' ) {
      const string = serializer.serializeToString( i )
      i.source = string
      return i
    }
  })
  const svgSources = await Promise.all(svgSourceOperations)
  return svgSources
}
