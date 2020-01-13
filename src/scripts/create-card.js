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
    ? (viewbox = 'gob__attrcont--viewbox')
    : (viewbox = 'gob__display-none')
  el.rects !== 'N/A'
    ? (visible = 'gob__attrcont--hidden')
    : (visible = 'gob__display-none')
  return `<span class=${viewbox}></span><span class=${visible}></span>`
}

export function createCards(svgInfo, cont) {
  // Create cards
  svgInfo.forEach((el, i) => {
    // Create dom elements
    const gobblerCard = createElement('div', 'gob__card', cont)
    const gobblerCardClone = createElement('div', 'gob__card__svg', gobblerCard)
    const gobblerCardCloneWrapper = createElement(
      'div',
      'gob__card__svg__wrapper',
      gobblerCardClone
    )
    gobblerCardCloneWrapper.appendChild(el.cleanXml)
    const gobblerCardFooter = createElement(
      'div',
      'gob__card__footer',
      gobblerCard
    )
    const gobblerCardBtns = createElement('div', 'gob__btns', gobblerCardFooter)

    // Check if SVG has white attribute
    el.hasWhite ? gobblerCardClone.classList.add('gob__card__svg--white') : null

    // Smooth card load
    setTimeout(() => {
      gobblerCard.classList.add('gob__card--show')
    }, 60 * i)

    // Create card warnings
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

    // Create card footer
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

    if (el.svgString.length > 0) {
      // Download button
      const dOpti = createElement('button', 'gob__btn')
      dOpti.classList.add('gob__btn--download')
      dOpti.addEventListener('click', () => {
        toggleSuccess(dOpti, 'gob__btn--success--download')
        download.createOptiDownload(el)
      })
      gobblerCardBtns.appendChild(dOpti)

      // Copy button
      const cOpti = createElement('button', 'gob__btn')
      cOpti.classList.add('gob__btn--copy')
      cOpti.addEventListener('click', () => {
        toggleSuccess(cOpti, 'gob__btn--success--copy')
        download.copyOptiClipboard(el)
      })
      gobblerCardBtns.appendChild(cOpti)

      // // PNG options
      // const pOpti = createElement('button', 'gob__btn')
      // pOpti.classList.add('gob__btn--pngdownload')
      // pOpti.addEventListener('click', () => {
      //   toggleSuccess(pOpti, 'gob__btn--success--pngdownload')
      //   download.createOptimizedExportedDownload(el, 'png')
      // })
      // gobblerCardBtns.appendChild(pOpti)

      // // JPG options
      // const jOpti = createElement('button', 'gob__btn')
      // jOpti.classList.add('gob__btn--jpgdownload')
      // jOpti.addEventListener('click', () => {
      //   toggleSuccess(jOpti, 'gob__btn--success--jpgdownload')
      //   download.createOptimizedExportedDownload(el, 'jpg')
      // })
      // gobblerCardBtns.appendChild(jOpti)
    } else {
      // adds alert to card
      const newTag = createElement('div', 'gob__tag--cors')
      gobblerCard.appendChild(newTag)

      // adds full width to button
      gobblerCardBtns.classList.add('gob__btns--block')

      // Same-origin policies button. opens svg in new window
      const corsBtn = createElement('a', 'gob__btn')
      corsBtn.classList.add('gob__btn--cors-btn')
      corsBtn.setAttribute('target', '_blank')
      corsBtn.setAttribute('href', el.url)

      gobblerCardBtns.appendChild(corsBtn)
    }
  })
}
