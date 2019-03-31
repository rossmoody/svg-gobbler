import { createDownload } from './create-download'

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

    svgCard.innerHTML = svg.source

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
