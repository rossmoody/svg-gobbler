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

// Tag helper
function makeTag(string, tagClass, cont) {
  const newTag = createElement('div', 'gob__tag')
  newTag.innerHTML = string
  newTag.classList.add(tagClass)
  cont.appendChild(newTag)
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

    // create card tags
    makeTag(el.type, 'gob__tag--good', gobblerCardFooter)
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
    el.inlineSize
      ? makeTag('inline sizes', 'gob__tag--good', gobblerCardFooter)
      : null
    el.rects && el.rects !== 'hidden'
      ? makeTag(el.rects, 'gob__tag--good', gobblerCardFooter)
      : makeTag(el.rects, 'gob__tag--bad', gobblerCardFooter)
    el.svgXml.hasAttribute('viewBox')
      ? (() => {
          const viewBox = el.svgXml.getAttribute('viewBox')
          makeTag('viewBox', 'gob__tag--good', gobblerCardFooter)
          makeTag(viewBox, 'gob__tag--good', gobblerCardFooter)
        })()
      : makeTag('no viewBox', 'gob__tag--bad', gobblerCardFooter)

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
