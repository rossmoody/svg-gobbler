const prefix = {
  xmlns: 'http://www.w3.org/2000/xmlns/',
  xlink: 'http://www.w3.org/1999/xlink',
  svg: 'http://www.w3.org/2000/svg'
}

//
// --- Download btn placement
//
function createPopover (sources) {
  // --- Cleanup function. Still unsure how it works but it results in 30% less child nodes
  const geezies = document.querySelectorAll('.svgeezy')
  Array.prototype.forEach.call(geezies, el => {
    el.parentNode.removeChild(el)
  })

  // --- Full page container
  const svgeezyContainer = document.createElement('div')

  // --- Attach full page container to body as last child
  document.body.appendChild(svgeezyContainer)

  // --- Give the container a class
  svgeezyContainer.setAttribute('class', 'svgeezy__container')

  // --- Create buttons on svgs
  sources.forEach((svg, id) => {
    const buttonWrapper = document.createElement('div')
    svgeezyContainer.appendChild(buttonWrapper)
    buttonWrapper.setAttribute('class', 'svgeezy__button')
    // attaches button relative to svg placement on page
    buttonWrapper.style['top'] = `${svg.top + document.body.scrollTop}px`
    buttonWrapper.style['left'] = `${svg.left + document.body.scrollLeft}px`

    const button = document.createElement('button')
    buttonWrapper.appendChild(button)
    button.setAttribute('data-source-id', id)
    button.textContent = 'Download'

    button.onclick = () => {
      download(svg)
    }
  })
}

//
// --- File download specs
//

function download (source) {
  let filename = 'svgeezy-icon'

  const url = window.URL.createObjectURL(
    new Blob(source.source, { type: 'text/xml' })
  )

  const a = document.createElement('a')
  document.body.appendChild(a)
  a.setAttribute('download', `${filename}.svg`)
  a.setAttribute('href', url)
  a.click()
}

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
    tree.push(obj)
    return tree
  }
  // hardcode computed css styles inside svg
  const allElements = traverse(svg)
  let i = allElements.length
  // run until length reaches 0
  while (i--) {
    explicitlySetStyle(allElements[i])
  }
}

/**
 * Returns @svgInfo
 * Gets a list of all the svg content on the page,
 * strips it apart and returns it as an array of
 * valid svg source code.
 */

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

//
// --- Initialize the geezies
//

function initialize () {
  const svgeezyDocument = [window.document]
  const SVGSources = []

  // create empty svg element
  const emptySvg = window.document.createElementNS(prefix.svg, 'svg')
  // attach emptysvg element to body
  window.document.body.appendChild(emptySvg)
  // create a css document to add to
  const emptySvgDeclarationComputed = getComputedStyle(emptySvg)

  svgeezyDocument.forEach(doc => {
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

initialize()
