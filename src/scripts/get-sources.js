const ajaxCall = ( el, elSvg ) => {
  return new Promise( function ( resolve ) {
    let ajax = new XMLHttpRequest()
    let serializer = new XMLSerializer()
    let parser = new DOMParser()

    ajax.open( 'GET', elSvg, true )
    ajax.send()
    ajax.onload = function ( e ) {
      let xml = parser.parseFromString( ajax.responseText, 'image/svg+xml' )
        .children[ 0 ]
      const string = serializer.serializeToString( xml )
      el.xml = xml
      el.source = string
      resolve()
    }
  } )
}

// Remove duplicates
function getUnique ( arr, comp ) {
  const unique = arr
    .map( e => e[ comp ] )

    // store the keys of the unique objects
    .map( ( e, i, final ) => final.indexOf( e ) === i && i )

    // eliminate the dead keys & store unique objects
    .filter( e => arr[ e ] ).map( e => arr[ e ] );

  return unique;
}


///////////////////////
// Requests, parses and serializes SVG information
// using different methods based on how it's displayed
// in the DOM (bgImg, imgSrc, inline SVG, sprite, object)
export async function getSources ( svgInfo ) {
  let svgSourceOperations = svgInfo.map( async ( i ) => {
    let serializer = new XMLSerializer()
    if ( i.srctype === 'imgTag' ) {
      await ajaxCall( i, i.src )
      return i
    } else if ( i.srctype === 'bgImg' ) {
      await ajaxCall( i, i.bgImgUrl )
      return i
    } else if ( i.srctype === 'useTag' ) {
      i.xml = i
      const string = serializer.serializeToString( i )
      i.source = string
      return i
    } else if ( i.srctype === 'objTag' ) {
      await ajaxCall( i, i.data )
      return i
    } else if ( i.srctype === 'svgTag' ) {
      i.xml = i
      const string = serializer.serializeToString( i )
      i.source = string
      return i
    }
  } )

  let svgSources = await Promise.all( svgSourceOperations )
  svgSources = getUnique( svgSources, 'source' )
  return svgSources
}
