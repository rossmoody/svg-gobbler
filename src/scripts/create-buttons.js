import { downloadIcon, copyIcon } from './icons'

export function createButtons(btnContainer, svg) {
  function toggleClass(el) {
    el.classList.add('success')
    setTimeout(() => {
      el.classList.remove('success')
    }, 3000)
  }

  function createElement(el, elClass) {
    const i = document.createElement(el)
    i.className = elClass
    i.classList.add('card__btn')
    i.addEventListener('click', function() {
      toggleClass(i)
    })
    return i
  }

  const dOrig = createElement('div', 'card__btn--d-orig')
  dOrig.insertAdjacentHTML('beforeend', downloadIcon)
  btnContainer.appendChild(dOrig)
  dOrig.addEventListener('click', function() {
    svg.createOrigDownload()
  })

  const cOrig = createElement('div', 'card__btn--c-orig')
  cOrig.insertAdjacentHTML('beforeend', copyIcon)
  cOrig.addEventListener('click', function() {
    svg.copyOrigClipboard()
  })
  btnContainer.appendChild(cOrig)

  const dOpti = createElement('div', 'card__btn--d-opti')
  dOpti.insertAdjacentHTML('beforeend', downloadIcon)
  btnContainer.appendChild(dOpti)
  dOpti.addEventListener('click', function() {
    svg.createOptiDownload()
  })

  const cOpti = createElement('div', 'card__btn--c-opti')
  cOpti.insertAdjacentHTML('beforeend', copyIcon)
  cOpti.addEventListener('click', function() {
    svg.copyOptiClipboard()
  })
  btnContainer.appendChild(cOpti)
}
