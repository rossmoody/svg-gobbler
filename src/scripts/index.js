import createUI from './create-ui'

require('../styles/index.scss')

const start = {
  // this doesn't work at the moment. no styles being injected.
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
    if (data.length === 0) {
      start.noGobbles()
    } else {
      start.theGobbles(data)
    }
  } catch (error) {
    start.errorGobbles(error)
  }
}
