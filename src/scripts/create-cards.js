import { createDownload } from './create-download'

///////////////
// Add overlay element to viewport baed on SVG position
function addOverlay ( el, cont ) {
  var rects = el.getBoundingClientRect()
  cont.style.width = rects.width + 'px'
  cont.style.height = rects.height + 'px'
}

//////////////////
// Create a btn for each svg element
export const createCards = svgInfo => {
  // Create page container
  const domContainer = document.createElement( 'div' )
  domContainer.setAttribute( 'class', 'gobbler' )

  // Create overlay
  const svgOverlay = document.createElement( 'div' )
  svgOverlay.setAttribute( 'class', 'gobbler__overlay' )

  svgInfo.forEach( ( svg, id ) => {
    // create overlay and container
    const svgCard = document.createElement( 'div' )
    svgCard.setAttribute( 'class', 'gobbler__card' )
    svgCard.setAttribute( 'data-source-id', id )

    // attach to body container
    domContainer.appendChild( svgCard )

    // process svg coordinates in viewport
    // addOverlay( svg.element, svgCard )

    let clone = svg.cloneNode( true )
    clone.setAttribute( 'class', 'gobbler__clone' )
    svgCard.appendChild( clone )

    // Set onclick for btn
    svgCard.onclick = () => {
      createDownload( svg )
    }
  } )

  // Append container at end of dom container
  domContainer.insertAdjacentElement( 'beforeend', svgOverlay )

  // Append container after body
  document.body.insertAdjacentElement( 'beforebegin', domContainer )
}
