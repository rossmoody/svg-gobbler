const classify = {
  determineType() {
    if (this.origEle.tagName === 'svg') {
      const firstChild = this.origEle.firstElementChild

      if (
        (firstChild && firstChild.tagName === 'symbol') ||
        firstChild.tagName === 'defs'
      ) {
        this.type = 'symbol'
      } else if (firstChild && firstChild.tagName === 'use') {
        this.type = 'sprite'
        this.spriteId = firstChild.getAttributeNS(
          'http://www.w3.org/1999/xlink',
          'href'
        )
      } else {
        this.type = 'inline'
      }
    } else if (this.origEle.tagName === 'IMG') {
      const imgSrc = this.origEle.src

      if (imgSrc) {
        const suffix = imgSrc.split('.').pop()

        if (suffix === 'svg' || imgSrc.includes('data:image/svg+xml;base64')) {
          this.url = imgSrc
          this.type = 'img src'
        }
      }
    } else if (this.origEle.tagName === 'OBJECT') {
      this.url = this.data
      this.type = 'object'
    } else if (this.origEle.tagName === 'DIV') {
      const style = window.getComputedStyle(this.origEle, null)
      const url = style.backgroundImage.slice(4, -1).replace(/"/g, '')
      const fileType = url.substr(url.lastIndexOf('.') + 1)

      if (style.backgroundImage !== 'none' && /(svg)$/gi.test(fileType)) {
        this.url = url
        this.type = 'bg img'
      }
    }
    return this
  },

  buildSpriteString() {
    if (this.spriteId) {
      const symbolLink = document.querySelector(this.spriteId).cloneNode(true)
      if (symbolLink) {
        this.origEle.prepend(symbolLink)
      }
    }
    return this
  },

  getRects(el) {
    const rects = el.getBoundingClientRect()
    this.height = Math.ceil(rects.height)
    this.width = Math.ceil(rects.width)
  },

  determineSize() {
    this.size = `${this.width}x${this.height}`

    if (this.width === 0 && this.height === 0) {
      this.size = 'Hidden'
    } else if (
      this.origEle.hasAttribute('width') &&
      this.origEle.hasAttribute('height')
    ) {
      const width = this.origEle.getAttribute('width')
      const height = this.origEle.getAttribute('height')
      if (width.includes('%' || 'em')) {
        this.size = ''
      } else if (width.includes('px')) {
        this.size = `${width.slice(0, -2)}x${height.slice(0, -2)}`
      } else {
        this.size = `${width}x${height}`
        this.width = width
        this.height = height
      }
    }
    return this
  },

  async fetchSvg() {
    let content
    const serializer = new XMLSerializer()

    if (this.url) {
      const response = await fetch(this.url, { mode: 'no-cors' })

      if (response.type === 'opaque') {
        this.cors = true
        content = serializer.serializeToString(this.origEle)
      } else {
        content = await response.text()
      }
    } else {
      content = serializer.serializeToString(this.origEle)
    }

    this.svgString = content
    return this
  },

  checkForWhite() {
    const whiteStrings = ['white', '#FFF', '#FFFFFF', '#fff', '#ffffff']

    for (const string of whiteStrings) {
      if (
        (this.presentationSvg && this.presentationSvg.includes(string)) ||
        this.cors
      ) {
        this.hasWhite = true
      }
    }

    return this
  },

  fixupString() {
    const doc = new DOMParser().parseFromString(this.svgString, 'image/svg+xml')
    const ele = doc.documentElement

    if (ele.nodeName === 'svg') {
      if (!ele.hasAttribute('viewBox')) {
        if (!this.width === 0 && !this.height === 0)
          ele.setAttribute('viewBox', `0 0 ${this.width} ${this.height}`)
      }

      ele.removeAttribute('height')
      ele.removeAttribute('width')
      ele.removeAttribute('style')
      ele.removeAttribute('class')
      ele.removeAttribute('fill')
    }

    ele.setAttribute('class', 'gob__card__svg__trick')
    ele.setAttribute('preserveAspectRatio', 'xMidYMid meet')

    this.presentationSvg = new XMLSerializer().serializeToString(ele)

    return this
  },
}

export default classify
