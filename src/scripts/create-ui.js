import { closeIcon, gobLogo, feedbackIcon } from './icons'
import { createCards } from './create-card'

// Element creation helper
function createElement(el, elClass, elPar = null, innH = null) {
  const i = document.createElement(el)
  i.className = elClass
  i.innerHTML = innH
  return elPar ? elPar.appendChild(i) : i
}

// Structure object
const struct = {
  globalContainer: 'gob',
  header: 'gob__header',
  container: 'gob__container',
  overlay: 'gob__overlay',
  logoContainer: 'gob__logoCont',
  countContainer: 'gob__countCont'
}

export const createUI = svgInfo => {
  const gobbler = createElement('div', struct.globalContainer)
  document.body.insertAdjacentElement('beforebegin', gobbler)

  // Create structure
  const header = createElement('div', struct.header)
  const container = createElement('div', struct.container)
  const overlay = createElement('div', struct.overlay)
  const logoCont = createElement('div', struct.logoContainer)
  const countCont = createElement('div', struct.countContainer)

  // Form structure
  gobbler.appendChild(header)
  gobbler.appendChild(container)
  gobbler.appendChild(overlay)
  header.appendChild(logoCont)
  header.appendChild(countCont)

  // Deliver singular or plural of "SVGs"
  function isPlural() {
    return svgInfo.length === 1
      ? svgInfo.length + ' SVG'
      : svgInfo.length + ' SVGs'
  }

  // Create header
  createElement('div', 'gob__logo', logoCont, gobLogo)
  createElement('div', 'gob__count--svg', countCont, isPlural())
  createElement('div', 'gob__feedback', countCont, feedbackIcon)
  createElement('div', 'gob__close', countCont, closeIcon)

  // Close gobbler
  function closeGobbler() {
    gobbler.classList.add('gob--hide')
    setTimeout(() => {
      gobbler.remove()
    }, 500)
  }

  // Close event listeners
  document.querySelector('.gob__close').addEventListener('click', function() {
    closeGobbler()
  })
  document.querySelector('.gob__overlay').addEventListener('click', function() {
    closeGobbler()
  })

  // Header event listeners
  document
    .querySelector('.gob__feedback')
    .addEventListener('click', function() {
      var win = window.open('https://www.surveymonkey.com/r/WQJVQNQ', '_blank')
      win.focus()
    })

  // Smooth load header
  setTimeout(() => {
    header.classList.add('gob__header--show')
  }, 80)

  createCards(svgInfo, container)
}
