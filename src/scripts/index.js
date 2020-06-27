import '../styles/index.scss'
import { organizeSVGs } from './organize-svgs'
import { createUI } from './create-ui'
import { download } from './download-svgs'

class DecisionMaker {
  noGobbles() {
    const doc = document.querySelector('body')
    const noGobbler = document.createElement('div')
    noGobbler.classList.add('gob__noGobbler')
    noGobbler.innerHTML = `😢 Drats, no SVGs to gobble `
    doc.insertAdjacentElement('beforebegin', noGobbler)
    setTimeout(() => {
      noGobbler.remove()
    }, 3000)
  }

  oneGobble() {
    download.copyIsolatedSVG()
  }

  errorGobbles(error) {
    const doc = document.querySelector('body')
    const noGobbler = document.createElement('div')
    noGobbler.classList.add('gob__noGobbler')
    noGobbler.innerHTML = `😢 There's an error: "${error}"`
    doc.insertAdjacentElement('beforebegin', noGobbler)
    setTimeout(() => {
      noGobbler.remove()
    }, 3000)
  }

  theGobbles(i) {
    function scrollToTop() {
      const c = document.documentElement.scrollTop || document.body.scrollTop
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop)
        window.scrollTo(0, c - c / 8)
      }
    }
    scrollToTop()
    createUI(i)
  }
}

const start = new DecisionMaker()

async function init() {
  try {
    const hasGobbles = document.querySelector('.gob')
    if (hasGobbles) {
      console.log('There are already Gobblers about...')
    } else if (
      !document.querySelector('body') &&
      document.querySelector('svg')
    ) {
      start.oneGobble()
    } else {
      const allSVGs = await organizeSVGs()
      allSVGs.length === 0 ? start.noGobbles() : start.theGobbles(allSVGs)
    }
  } catch (error) {
    start.errorGobbles(error)
  }
}

init()
