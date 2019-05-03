import '../styles/core.scss'
import { createCards, noGobbles } from './ui-ctrl'
import { organizeSVGs } from './svg-factory'

async function init() {
  const hasGobbles = document.querySelector('.gob')
  if (hasGobbles) {
    console.log('gobble gobble')
  } else {
    const allSVGs = organizeSVGs()
    allSVGs.length === 0 ? noGobbles() : createCards(allSVGs)
  }
}

init()
