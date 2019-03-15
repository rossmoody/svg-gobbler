const prefix = {
  xmlns: 'http://www.w3.org/2000/xmlns/',
  xlink: 'http://www.w3.org/1999/xlink',
  svg: 'http://www.w3.org/2000/svg'
}

initialize()

function initialize () {
  const documents = [window.document]
  const SVGSources = []
  const iframes = document.querySelectorAll('iframe')
  const objects = document.querySelectorAll('object')

  // add empty svg element
  const emptySvg = window.document.createElementNS(prefix.svg, 'svg')
  window.document.body.appendChild(emptySvg)
  const emptySvgDeclarationComputed = getComputedStyle(emptySvg)
  Array.prototype.forEach.call(iframes, el => {
    try {
      if (el.contentDocument) {
        documents.push(el.contentDocument)
      }
    } catch (err) {
      console.log(err)
    }
  })
  Array.prototype.forEach.call(objects, el => {
    try {
      if (el.contentDocument) {
        documents.push(el.contentDocument)
      }
    } catch (err) {
      console.log(err)
    }
  })

  documents.forEach(doc => {
    const newSources = getSources(doc, emptySvgDeclarationComputed)
    for (let newSource of newSources) {
      SVGSources.push(newSource)
    }
  })
  if (SVGSources.length > 1) {
    createPopover(SVGSources)
  } else {
    // TODO: Can have lots of fun here.
    alert('No SVGeezies up in here.')
  }
}

// --- Download Btn Placement --- //

function createPopover (sources) {
  // --- Cleanup function. Still unsure how it works but
  // --- it results in 30% less child nodes
  const geezies = document.querySelectorAll('.svgeez')
  Array.prototype.forEach.call(geezies, el => {
    el.parentNode.removeChild(el)
  })

  sources.forEach(s1 => {
    sources.forEach(s2 => {
      if (s1 !== s2) {
        if (
          Math.abs(s1.top - s2.top) < 38 &&
          Math.abs(s1.left - s2.left) < 38
        ) {
          s2.top += 38
          s2.left += 38
        }
      }
    })
  })

  // --- Full page container --- //
  const svgeezContainer = document.createElement('div')

  // --- Attach full page container to body as last child -- //
  document.body.appendChild(svgeezContainer)

  // --- Give the container a class --- //
  svgeezContainer.setAttribute('class', 'svgeez__container')

  // --- Create buttons on svgs --- //
  sources.forEach((svg, id) => {
    const buttonWrapper = document.createElement('div')
    svgeezContainer.appendChild(buttonWrapper)
    buttonWrapper.setAttribute('class', 'svgeez__button')
    buttonWrapper.style['top'] = `${svg.top + document.body.scrollTop}px`
    buttonWrapper.style['left'] = `${svg.left + document.body.scrollLeft}px`
    // buttonWrapper.textContent = `${i}`

    const button = document.createElement('button')
    buttonWrapper.appendChild(button)
    button.setAttribute('data-source-id', id)
    button.textContent = 'Download'

    button.onclick = () => {
      download(svg)
    }
  })
}

function getSources (doc, emptySvgDeclarationComputed) {
  const svgInfo = []

  const svgs = doc.querySelectorAll('svg')
  Array.prototype.forEach.call(svgs, svg => {
    svg.setAttribute('version', '1.1')

    // removing attributes so they aren't doubled up
    svg.removeAttribute('xmlns')
    svg.removeAttribute('xlink')

    // These are needed for the svg
    if (!svg.hasAttributeNS(prefix.xmlns, 'xmlns')) {
      svg.setAttributeNS(prefix.xmlns, 'xmlns', prefix.svg)
    }

    if (!svg.hasAttributeNS(prefix.xmlns, 'xmlns:xlink')) {
      svg.setAttributeNS(prefix.xmlns, 'xmlns:xlink', prefix.xlink)
    }

    setInlineStyles(svg, emptySvgDeclarationComputed)

    // This gets appended to beginning of saved svg file to make it valide
    // More about this can be read here: https://www.w3.org/QA/2002/04/valid-dtd-list.html
    const doctype =
      '<?xml version="1.0"?> <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'

    const source = new XMLSerializer().serializeToString(svg)
    const rect = svg.getBoundingClientRect()
    svgInfo.push({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      class: svg.getAttribute('class'),
      id: svg.getAttribute('id'),
      name: svg.getAttribute('name'),
      childElementCount: svg.childElementCount,
      source: [doctype + source]
    })
  })
  return svgInfo
}

// --- Download button functionality --

function download (source) {
  let filename = 'untitled'

  if (source.name) {
    filename = source.name
  } else if (source.id) {
    filename = source.id
  } else if (source.class) {
    filename = source.class
  } else if (window.document.title) {
    filename = window.document.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  }

  const url = window.URL.createObjectURL(
    new Blob(source.source, { type: 'text/xml' })
  )

  const a = document.createElement('a')
  document.body.appendChild(a)
  a.setAttribute('class', 'svgeez')
  a.setAttribute('download', `${filename}.svg`)
  a.setAttribute('href', url)
  a.style['display'] = 'none'
  a.click()

  setTimeout(() => {
    window.URL.revokeObjectURL(url)
  }, 10)
}

// function that styles

function setInlineStyles (svg, emptySvgDeclarationComputed) {
  function explicitlySetStyle (element) {
    const cSSStyleDeclarationComputed = getComputedStyle(element)
    let i, len, key, value
    let computedStyleStr = ''
    for (i = 0, len = cSSStyleDeclarationComputed.length; i < len; i++) {
      key = cSSStyleDeclarationComputed[i]
      value = cSSStyleDeclarationComputed.getPropertyValue(key)
      if (value !== emptySvgDeclarationComputed.getPropertyValue(key)) {
        computedStyleStr += `${key}:${value};`
      }
    }
    element.setAttribute('style', computedStyleStr)
  }
  function traverse (obj) {
    const tree = []
    tree.push(obj)
    visit(obj)
    function visit (node) {
      if (node && node.hasChildNodes()) {
        let child = node.firstChild
        while (child) {
          if (child.nodeType === 1 && child.nodeName != 'SCRIPT') {
            tree.push(child)
            visit(child)
          }
          child = child.nextSibling
        }
      }
    }
    return tree
  }
  // hardcode computed css styles inside svg
  const allElements = traverse(svg)
  let i = allElements.length
  while (i--) {
    explicitlySetStyle(allElements[i])
  }
}
