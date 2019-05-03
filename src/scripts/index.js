import '../styles/core.scss'

import { findSVGs } from './find-svgs'
import { createCards, noGobbles } from './create-cards'

async function init() {
  const hasGobbles = document.querySelector('.gob')
  if (hasGobbles) {
    console.log('gobble gobble')
  } else {
    const allSVGs = await findSVGs()
    allSVGs.length === 0 ? noGobbles() : createCards(allSVGs)
  }
}

init()
