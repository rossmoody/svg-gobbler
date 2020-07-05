class SVG {
  constructor(el) {
    this.origEle = el
    this.origEleString = undefined
    this.url = undefined
    this.type = undefined
    this.size = undefined
    this.height = 48
    this.width = 48
    this.svgString = undefined
    this.presentationSvg = undefined
    this.cors = false
    this.hasWhite = false
    this.spriteId = undefined
  }

  determineType() {
    if (this.origEle.tagName === 'svg') {
      const firstChild = this.origEle.firstElementChild
      if (firstChild && firstChild.tagName === 'symbol') {
        this.type = 'symbol'
        this.spriteId = this.origEle.getAttribute('id')
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
      this.url = this.origEle.src
      this.type = 'img src'
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
  }

  serialize() {
    const serializer = new XMLSerializer()
    this.origEleString = serializer.serializeToString(this.origEle)
    return this
  }

  determineSize() {
    const rects = this.origEle.getBoundingClientRect()
    this.height = Math.ceil(rects.height)
    this.width = Math.ceil(rects.width)
    this.size = `${this.width}x${this.height}`

    if (this.width === 0 && this.height === 0) {
      this.size = 'N/A'
    } else if (
      this.origEle.hasAttribute('width') &&
      this.origEle.hasAttribute('height')
    ) {
      const width = this.origEle.getAttribute('width')
      const height = this.origEle.getAttribute('height')
      if (width.includes('%')) {
        this.size = '100%'
      } else if (width.includes('px')) {
        this.size = `${width.slice(0, -2)}x${height.slice(0, -2)}`
      } else {
        this.size = `${width}x${height}`
        this.width = width
        this.height = height
      }
    }
    return this
  }

  async fetchSvg() {
    const serializer = new XMLSerializer()
    const clone = this.origEle.cloneNode(true)

    clone.setAttribute('class', 'gob__card__svg__trick')
    clone.removeAttribute('height')
    clone.removeAttribute('width')
    clone.removeAttribute('style')
    clone.setAttribute('preserveAspectRatio', 'xMidYMid meet')

    if (!clone.hasAttribute('viewBox')) {
      clone.setAttribute('viewBox', `0 0 ${this.height} ${this.width}`)
    }

    if (clone.getAttribute('viewBox') === '0 0 0 0') {
      clone.setAttribute('viewBox', `0 0 24 24`)
    }

    this.svgString = this.origEleString
    this.presentationSvg = serializer.serializeToString(clone)

    if (this.url) {
      try {
        const response = await fetch(this.url, { mode: 'no-cors' })
        if (response.type === 'opaque') {
          this.cors = true
        } else {
          response.text().then(text => {
            // Would love to optimize this but not sure
            // how to conver it to elements
            this.presentationSvg = text
            this.svgString = text
          })
        }
      } catch (error) {
        console.log(`Some things aren't meant to be. This is why: ${error}`)
      }
    }
    return this
  }

  checkForWhite() {
    const whiteStrings = ['white', '#FFF', '#FFFFFF', '#fff', '#ffffff']

    for (const string of whiteStrings) {
      if (this.svgString && this.svgString.includes(string)) {
        this.hasWhite = true
      }
    }
  }
}

export default SVG
