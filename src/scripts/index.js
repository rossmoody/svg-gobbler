import createUI from './create-ui'
import download from './download'

require('../styles/index.scss')

const start = {
  noGobbles() {
    const doc = document.querySelector('body')
    const noGobbler = document.createElement('div')
    noGobbler.classList.add('gob__noGobbler')
    noGobbler.innerHTML = `😢 Drats, no SVGs to gobble `
    doc.insertAdjacentElement('beforebegin', noGobbler)
    setTimeout(() => {
      noGobbler.remove()
    }, 3000)
  },

  oneGobble() {
    download.copyIsolatedSVG()
  },

  errorGobbles(error) {
    const doc = document.querySelector('body')
    const noGobbler = document.createElement('div')
    noGobbler.classList.add('gob__noGobbler')
    noGobbler.innerHTML = `😢 There's an error: "${error}"`
    doc.insertAdjacentElement('beforebegin', noGobbler)
    setTimeout(() => {
      noGobbler.remove()
    }, 3000)
  },

  theGobbles(i) {
    createUI(i)
  },
}

export default async function gobble(data) {
  try {
    const hasGobbles = document.querySelector('.gob')
    if (hasGobbles) {
      console.log('There are already Gobblers about...')
    } else if (
      !document.querySelector('body') &&
      document.querySelector('svg')
    ) {
      start.oneGobble()
    } else if (data.length === 0) {
      start.noGobbles()
    } else {
      start.theGobbles(data)
    }
  } catch (error) {
    start.errorGobbles(error)
  }
}
