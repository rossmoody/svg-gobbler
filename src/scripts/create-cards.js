import { createButtons } from './create-buttons'
import { closeIcon, gobLogo } from './icons'

export function noGobbles() {
  const doc = document.querySelector('body')
  const noGobbler = document.createElement('div')
  noGobbler.classList.add('gob__noGobbler')
  noGobbler.innerHTML = `😢 Drats, no SVGs to gobble `
  doc.insertAdjacentElement('beforebegin', noGobbler)
  setTimeout(() => {
    noGobbler.remove()
  }, 3000)
}

// Element creation helper
function createElement(el, elClass, elPar = null, innH = null) {
  const i = document.createElement(el)
  i.className = elClass
  i.innerHTML = innH
  return elPar ? elPar.appendChild(i) : i
}

// Tag helper
function makeTag(string, tagClass, cont) {
  const newTag = createElement('div', 'gob__tag')
  newTag.innerHTML = string
  newTag.classList.add(tagClass)
  cont.appendChild(newTag)
}

// Scroll to top function
function scrollToTop() {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}

export function createCards(svgInfo) {
  scrollToTop()
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
  createElement('h2', 'gob__count--title', countCont, 'SVGs to gobble')
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

  // Create cards
  svgInfo.forEach((el, i) => {
    // Create dom elements
    const gobblerCard = createElement('div', 'gob__card')
    container.appendChild(gobblerCard)
    const gobblerCardClone = createElement('div', 'gob__card__svg')
    const gobblerCardCloneWrapper = createElement(
      'div',
      'gob__card__svg__wrapper'
    )
    const gobblerCardFooter = createElement('div', 'gob__card__footer')
    const gobblerCardBtns = createElement('div', 'gob__btns')

    // Smooth card load
    setTimeout(() => {
      gobblerCard.classList.add('gob__card--show')
    }, 60 * i)
    gobblerCard.appendChild(gobblerCardClone)
    gobblerCardClone.appendChild(gobblerCardCloneWrapper)
    gobblerCardCloneWrapper.appendChild(el.cleanXml)
    gobblerCard.appendChild(gobblerCardFooter)
    gobblerCardFooter.appendChild(gobblerCardBtns)

    // Make card tags
    el.type ? makeTag(el.type, 'gob__tag--good', gobblerCardFooter) : null
    el.type === 'sprite'
      ? (function() {
          const newTag = createElement('div', 'gob__tag--sprite')
          gobblerCard.appendChild(newTag)
        })()
      : null
    el.type === 'symbol'
      ? (function() {
          const newTag = createElement('div', 'gob__tag--symbol')
          gobblerCard.appendChild(newTag)
        })()
      : null
    el.inlineSize
      ? makeTag('inline sizes', 'gob__tag--good', gobblerCardFooter)
      : null
    el.rects && el.rects !== 'hidden'
      ? makeTag(el.rects, 'gob__tag--good', gobblerCardFooter)
      : makeTag(el.rects, 'gob__tag--bad', gobblerCardFooter)
    el.svgXml.hasAttribute('viewBox')
      ? (function() {
          const viewBox = el.svgXml.getAttribute('viewBox')
          makeTag('viewBox', 'gob__tag--good', gobblerCardFooter)
          makeTag(viewBox, 'gob__tag--good', gobblerCardFooter)
        })()
      : makeTag('no viewBox', 'gob__tag--bad', gobblerCardFooter)

    createButtons(gobblerCardBtns, el)
  })
}
