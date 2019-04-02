import '../styles/style.scss'
import { findSVGs } from './find-svgs'
import { createCards } from './create-cards'

// Does all the things
async function init () {
  const hasGobbles = document.querySelector( '.gobbler' )
  if ( hasGobbles ) {
    console.log( 'gobble gobble' )
  } else {

    // Find and process all the svgs
    const allSVGs = await findSVGs()

    // Create the cards
    createCards( allSVGs )
  }
}

init()
