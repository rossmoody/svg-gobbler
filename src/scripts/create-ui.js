import {
  closeIcon,
  gobLogo,
  feedbackIcon,
  infoIcon,
  viewboxIcon,
  hiddenIcon,
} from './icons'
import { createCards } from './create-card'
import { globalActions } from './global'

// Element creation helper
function createElement(el, elClass) {
  const i = document.createElement(el)
  i.className = elClass
  return i
}

const struct = {
  // Foundation
  globalContainer: 'gob',
  header: 'gob__header',
  container: 'gob__container',
  overlay: 'gob__overlay',
  logoContainer: 'gob__logoCont',
  countContainer: 'gob__countCont',
  // Header
  logo: 'gob__logo',
  count: 'gob__count--svg',
  tooltip: 'gob__tooltip',
  tooltipRow: 'gob__tooltip--row',
  feedback: 'gob__feedback',
  close: 'gob__close',
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

  // Create SVG Counter
  function isPlural() {
    return svgInfo.length === 1
      ? svgInfo.length + ' SVG ' + infoIcon
      : svgInfo.length + ' SVGs ' + infoIcon
  }

  function vbCount() {
    let num = 0
    svgInfo.forEach(el => {
      if (el.ele.hasAttribute('viewBox')) {
        num++
      }
    })
    return num
  }

  function hiddenCount() {
    let num = 0
    svgInfo.forEach(el => {
      if (el.rects == 'N/A') {
        num++
      }
    })
    return num
  }

  // Create tooltip
  function generateTooltip(i) {
    const viewboxes = vbCount()
    const hiddens = hiddenCount()
    const gobTooltip = createElement('div', struct.tooltip)
    const viewboxCont = createElement('div', struct.tooltipRow)
    viewboxCont.innerHTML = `${viewboxIcon} ${viewboxes} SVGs have a viewBox`
    const hiddenCont = createElement('div', struct.tooltipRow)
    hiddenCont.innerHTML = `${hiddenIcon} ${hiddens} SVGs are hidden from view`
    gobTooltip.appendChild(viewboxCont)
    gobTooltip.appendChild(hiddenCont)
    i.appendChild(gobTooltip)
  }

  // Create header
  const gobLogoEl = createElement('div', struct.logo)
  gobLogoEl.innerHTML = gobLogo
  logoCont.appendChild(gobLogoEl)
  const gobCount = createElement('div', struct.count)
  gobCount.innerHTML = isPlural()
  countCont.appendChild(gobCount)
  generateTooltip(gobCount)
  const gobFeedback = createElement('div', struct.feedback)
  gobFeedback.innerHTML = feedbackIcon
  countCont.appendChild(gobFeedback)
  const gobClose = createElement('div', struct.close)
  gobClose.innerHTML = closeIcon
  countCont.appendChild(gobClose)

  // Smooth load header
  setTimeout(() => {
    header.classList.add('gob__header--show')
  }, 80)

  createCards(svgInfo, container)
  globalActions()
}
