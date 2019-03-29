////////////
// Used to make the filename pretty
const prettyName = uglyName => ( uglyName.replace( /[^a-z0-9]/gi, '-' ).toLowerCase() )


/////////////////////
// Make a filename systematically
const getFilename = i => {
  let filename = 'gobble'
  if ( i.alt ) {
    filename = prettyName( i.alt )
  } else if ( i.id ) {
    filename = prettyName( i.id )
  } else if ( window.document.title ) {
    filename = prettyName( window.document.title )
  }
  i.filename = filename
}

////////////////
// Sets the SVG element to a property of itself and
// generates a filename based on the related info
export const getInfo = allSVGs => {
  allSVGs = allSVGs.map( i => {
    i.element = i
    getFilename( i )
    return i
  } )
  return allSVGs
}
