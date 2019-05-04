import { download } from './download-svgs'

// Toggle success class
function toggleSuccess(el, btnClass) {
  el.classList.add('gob__btn--success')
  el.classList.add(btnClass)
  setTimeout(() => {
    el.classList.remove('gob__btn--success')
    el.classList.remove(btnClass)
  }, 1500)
}

// Element creation helper
function createElement(el, elClass, elPar = null, innH = null) {
  const i = document.createElement(el)
  i.className = elClass
  i.innerHTML = innH
  return elPar ? elPar.appendChild(i) : i
}

const hasAttr = el => {
  let viewbox
  let visible
  el.svgXml.hasAttribute('viewBox')
    ? (viewbox = 'gob__attrcont--good')
    : (viewbox = 'gob__attrcont--bad')
  el.rects !== 'hidden'
    ? (visible = 'gob__attrcont--good')
    : (visible = 'gob__attrcont--bad')
  return `<span class=${viewbox}>viewBox</span><span class=${visible}>Visible</span>`
}

export function createCards(svgInfo, cont) {
  // Create cards
  svgInfo.forEach((el, i) => {
    // Create dom elements
    const gobblerCard = createElement('div', 'gob__card')
    cont.appendChild(gobblerCard)
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

    // create card warnings
    el.type === 'sprite'
      ? (() => {
          const newTag = createElement('div', 'gob__tag--sprite')
          gobblerCard.appendChild(newTag)
        })()
      : null
    el.type === 'symbol'
      ? (() => {
          const newTag = createElement('div', 'gob__tag--symbol')
          gobblerCard.appendChild(newTag)
        })()
      : null

    // create card footer
    createElement(
      'div',
      'gob__typecont',
      gobblerCardFooter,
      `<h4>Type</h4><h3>${el.type}</h3>`
    )
    createElement(
      'div',
      'gob__sizecont',
      gobblerCardFooter,
      `<h4>Size</h4><h3>${el.rects}</h3>`
    )
    createElement('div', 'gob__attrcont', gobblerCardFooter, hasAttr(el))

    // create download buttons
    const dOpti = createElement('button', 'gob__btn')
    dOpti.classList.add('gob__btn--download')
    dOpti.addEventListener('click', () => {
      toggleSuccess(dOpti, 'gob__btn--success--download')
      download.createOptiDownload(el)
    })
    gobblerCardBtns.appendChild(dOpti)

    const cOpti = createElement('button', 'gob__btn')
    cOpti.classList.add('gob__btn--copy')
    cOpti.addEventListener('click', () => {
      toggleSuccess(cOpti, 'gob__btn--success--copy')
      download.copyOptiClipboard(el)
    })
    gobblerCardBtns.appendChild(cOpti)
  })
}
