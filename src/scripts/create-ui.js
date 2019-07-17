import { closeIcon, gobLogo } from './icons'
import { createCards } from './create-card'

// Element creation helper
function createElement(el, elClass, elPar = null, innH = null) {
  const i = document.createElement(el)
  i.className = elClass
  i.innerHTML = innH
  return elPar ? elPar.appendChild(i) : i
}

export const createUI = svgInfo => {
  const gobbler = createElement('div', 'gob')
  document.body.insertAdjacentElement('beforebegin', gobbler)

  // Create containers
  const header = createElement('div', 'gob__header')
  gobbler.appendChild(header)
  const container = createElement('div', 'gob__container')
  gobbler.appendChild(container)
  const overlay = createElement('div', 'gob__overlay')
  gobbler.appendChild(overlay)
  const logoCont = createElement('div', 'gob__logoCont')
  header.appendChild(logoCont)
  const countCont = createElement('div', 'gob__countCont')
  header.appendChild(countCont)

  // Create header
  createElement('div', 'gob__logo', logoCont, gobLogo)
  createElement('h1', 'gob__title', logoCont, 'SVG Gobbler')
  createElement('div', 'gob__count--svg', countCont, svgInfo.length)
  createElement('h2', 'gob__count--title', countCont, 'SVGs on the page')
  createElement('div', 'gob__close', countCont, closeIcon)

  // Close event listeners
  document.querySelector('.gob__close').addEventListener('click', function() {
    gobbler.remove()
  })
  document.querySelector('.gob__overlay').addEventListener('click', function() {
    gobbler.remove()
  })

  // Smooth load header
  setTimeout(() => {
    header.classList.add('gob__header--show')
  }, 50)

  createCards(svgInfo, container)
}
