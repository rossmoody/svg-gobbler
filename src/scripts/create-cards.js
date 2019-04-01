// import { createDownload } from './create-download'

//////////////////////////////
// Generate correctly sized viewboxes for each element
// to scale svg correctly in card container
function cleanupXML ( el, elxml ) {
  let rects = el.getBoundingClientRect()
  let viewBoxHeight = rects.width
  let viewBoxWidth = rects.height

  elxml.setAttribute( 'class', 'gobbler__card__clone__wrapper__svg' )
  elxml.removeAttribute( 'height' )
  elxml.removeAttribute( 'width' )
  elxml.removeAttribute( 'style' )
  elxml.hasAttribute( 'viewBox' ) ? '' : elxml.setAttribute( 'viewBox', `0 0 ${ viewBoxHeight } ${ viewBoxWidth }` )
  elxml.getAttribute( 'viewBox' ) === '0 0 0 0' ? elxml.setAttribute( 'viewBox', `0 0 48 48` ) : ''
  elxml.setAttribute( 'preserveAspectRatio', 'xMidYMid meet' )
  return elxml
}

export function createCards ( svgInfo ) {
  const domContainer = document.createElement( 'div' )
  const svgOverlay = document.createElement( 'div' )
  domContainer.setAttribute( 'class', 'gobbler' )
  svgOverlay.setAttribute( 'class', 'gobbler__overlay' )

  // Loop through to create cards
  svgInfo.forEach( ( svg, id ) => {
    const cleanedXML = cleanupXML( svg, svg.xml )
    // create elements
    const svgCard = document.createElement( 'div' )
    const svgClone = document.createElement( 'div' )
    const svgCloneWrapper = document.createElement( 'div' )
    const btnContainer = document.createElement( 'div' )

    svgCard.setAttribute( 'class', 'gobbler__card' )
    svgClone.setAttribute( 'class', 'gobbler__card__clone' )
    svgCloneWrapper.setAttribute( 'class', 'gobbler__card__clone__wrapper' )
    btnContainer.setAttribute( 'class', 'gobbler__card__btn-container' )
    domContainer.appendChild( svgCard )
    svgCard.appendChild( svgClone )
    svgClone.appendChild( svgCloneWrapper )
    svgCard.appendChild( btnContainer )
    // svgCard.setAttribute( 'data-source-id', id )
    svgCloneWrapper.appendChild( cleanedXML )

    // // Set onclick for btn
    // svgCard.onclick = () => {
    //   createDownload( svg )
    // }
  } )

  // Append container at end of dom container
  domContainer.insertAdjacentElement( 'beforeend', svgOverlay )

  // Append container after body
  document.body.insertAdjacentElement( 'beforebegin', domContainer )
}
