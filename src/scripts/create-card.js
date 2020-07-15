import download from './download'
import toggleModal from './modal'
import buildModal from './export-image'

const make = {
  element(el, cName) {
    const result = window.document.createElement(el)
    result.className = cName
    return result
  },

  downloadBtn(svg) {
    const btn = make.element('button', 'gob__btn')
    btn.classList.add('gob__btn--download')
    btn.addEventListener('click', () => {
      make.success(btn, 'gob__btn--success--download')
      download.optimized(svg.svgString)
    })

    return btn
  },

  copyBtn(svg) {
    const copyBtn = make.element('button', 'gob__btn')
    copyBtn.classList.add('gob__btn--copy')
    copyBtn.addEventListener('click', () => {
      make.success(copyBtn, 'gob__btn--success--copy')
      download.copyOptimized(svg.svgString)
    })

    return copyBtn
  },

  moreBtn(svg) {
    const moreBtn = make.element('button', 'gob__btn')
    const moreIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`
    moreBtn.classList.add('gob__btn--more')
    moreBtn.insertAdjacentHTML('afterbegin', moreIcon)
    moreBtn.appendChild(make.menu(svg))

    return moreBtn
  },

  menu(svg) {
    const menu = make.element('div', 'gob__menu')
    const menuUl = make.element('ul', 'gob__menu-ul')
    menuUl.setAttribute('role', 'menu')

    function makeItem(string) {
      const li = document.createElement('li')
      li.setAttribute('role', 'none')

      const btn = document.createElement('button')
      btn.setAttribute('role', 'menuitem')
      btn.textContent = string
      li.appendChild(btn)
      return li
    }

    const downloadBtn = makeItem('Download unoptimized')
    const copyBtn = makeItem('Copy unoptimized')
    const exportBtn = makeItem('Export PNG')

    downloadBtn.addEventListener('click', () => {
      download.original(svg.svgString)
    })

    copyBtn.addEventListener('click', () => {
      download.copyOriginal(svg.svgString)
    })

    exportBtn.addEventListener('click', () => {
      buildModal(svg.svgString)
      toggleModal()
    })

    menu.appendChild(menuUl)
    menuUl.appendChild(exportBtn)
    menuUl.insertAdjacentHTML('beforeend', `<hr>`)
    menuUl.appendChild(downloadBtn)
    menuUl.appendChild(copyBtn)

    return menu
  },

  corsTag() {
    const newTag = make.element('div', 'gob__tag--cors')
    return newTag
  },

  newTabBtn(svg) {
    const corsBtn = make.element('a', 'gob__btn')
    corsBtn.classList.add('gob__btn--cors-btn')
    corsBtn.setAttribute('target', '_blank')
    corsBtn.setAttribute('href', svg.url)
    return corsBtn
  },

  success(el, cName) {
    el.classList.add('gob__btn--success')
    el.classList.add(cName)
    setTimeout(() => {
      el.classList.remove('gob__btn--success')
      el.classList.remove(cName)
    }, 1500)
  },
}

const createCards = (svgInfo, cont) => {
  svgInfo.forEach((svg, index) => {
    const card = make.element('div', 'gob__card')
    cont.appendChild(card)

    const svgCont = make.element('div', 'gob__card__svg')
    card.appendChild(svgCont)
    if (svg.hasWhite) svgCont.classList.add('gob__card__svg--white')

    const svgWrapper = make.element('div', 'gob__card__svg__wrapper')
    svgWrapper.insertAdjacentHTML('afterbegin', svg.presentationSvg)
    svgCont.appendChild(svgWrapper)

    const footer = make.element('div', 'gob__card__footer')
    card.appendChild(footer)

    const btnCont = make.element('div', 'gob__btns')
    footer.appendChild(btnCont)

    // Smooth card load
    setTimeout(() => {
      card.classList.add('gob__card--show')
    }, 60 * index)

    // Create card warnings
    if (svg.type === 'symbol') {
      const newTag = make.element('div', 'gob__tag--symbol')
      card.appendChild(newTag)
    }

    const svgType = make.element('div', 'gob__typecont')
    svgType.innerHTML = `<h4>Type</h4><h3>${svg.type}</h3>`
    footer.appendChild(svgType)

    const svgSize = make.element('div', 'gob__sizecont')
    svgSize.innerHTML = `<h4>Size</h4><h3>${svg.size}</h3>`
    footer.appendChild(svgSize)

    if (!svg.cors) {
      btnCont.appendChild(make.downloadBtn(svg))
      btnCont.appendChild(make.copyBtn(svg))
      btnCont.appendChild(make.moreBtn(svg))
    } else {
      btnCont.appendChild(make.newTabBtn(svg))
      btnCont.classList.add('gob__btns--block')
      card.appendChild(make.corsTag())
    }
  })
}

export default createCards
