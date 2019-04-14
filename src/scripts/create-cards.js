// import { createDownload } from './create-download'
import { createButtons } from './create-buttons'
import { closeIcon } from './icons'

function createElement(el, elClass) {
  const i = document.createElement(el)
  i.className = elClass
  return i
}

export function createCards(svgInfo) {
  // Create container
  const gobbler = createElement('div', 'gobbler')
  document.body.insertAdjacentElement('beforebegin', gobbler)

  svgInfo.forEach(el => {
    const gobblerCard = createElement('div', 'card')
    const gobblerCardClone = createElement('div', 'card__clone')
    const gobblerCardCloneWrapper = createElement('div', 'card__clone__wrapper')
    const gobblerCardBtnContainer = createElement('div', 'card__btn-container')

    gobbler.appendChild(gobblerCard)
    gobblerCard.appendChild(gobblerCardClone)
    gobblerCardClone.appendChild(gobblerCardCloneWrapper)
    gobblerCardCloneWrapper.appendChild(el.cleanXml)
    gobblerCard.appendChild(gobblerCardBtnContainer)

    createButtons(gobblerCardBtnContainer, el)
  })

  // Add close button
  const closeGobbler = createElement('div', 'gobbler__close')
  closeGobbler.insertAdjacentHTML('beforeend', closeIcon)
  closeGobbler.addEventListener('click', function() {
    gobbler.remove()
  })
  gobbler.insertAdjacentElement('beforeend', closeGobbler)
  // Add overlay
  const gobblerOverlay = createElement('div', 'gobbler__overlay')
  gobblerOverlay.addEventListener('click', function() {
    gobbler.remove()
  })
  gobbler.insertAdjacentElement('beforeend', gobblerOverlay)
}
