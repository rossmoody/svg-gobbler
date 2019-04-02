// import { createDownload } from './create-download'

function createElement ( el, elClass ) {
  const i = document.createElement( el )
  i.className = elClass
  return i
}

export function createCards ( svgInfo ) {
  const gobbler = createElement( 'div', 'gobbler' )
  document.body.insertAdjacentElement( 'beforebegin', gobbler )
  gobbler.addEventListener( 'click', function ( e ) {
    if ( e.target.classList.contains( 'gobbler__overlay' ) )
      gobbler.remove()
  } )

  const gobblerOverlay = createElement( 'div', 'gobbler__overlay' )
  gobbler.insertAdjacentElement( 'beforeend', gobblerOverlay )

  svgInfo.forEach( ( el ) => {
    const gobblerCard = createElement( 'div', 'gobbler__card' )
    const gobblerCardClone = createElement( 'div', 'gobbler__card__clone' )
    const gobblerCardCloneWrapper = createElement( 'div', 'gobbler__card__clone__wrapper' )
    const gobblerCardBtnContainer = createElement( 'div', 'gobbler__card__btn-container' )

    gobbler.appendChild( gobblerCard )
    gobblerCard.appendChild( gobblerCardClone )
    gobblerCardClone.appendChild( gobblerCardCloneWrapper )
    gobblerCard.appendChild( gobblerCardBtnContainer )

    // svgCard.onclick = () => {
    //   createDownload( svg )
    // }
  } )
}
