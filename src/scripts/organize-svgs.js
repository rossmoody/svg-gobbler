import findSVGs from './find-svgs'

async function generateSvgString(svg) {
  svg.svgString = svg.dupCheck

  if (svg.url) {
    await fetch(svg.url, { mode: 'no-cors' })
      .then(r => r.text())
      .then(text => {
        svg.svgString = text
      })
      .catch()
  }
}

// Set size attributes to svg viewBox attr dynamically for better render in card
async function cleanupXML(svg) {
  const rects = svg.originalSvg.getBoundingClientRect()
  console.log(rects)
  const viewBoxHeight = Math.floor(rects.width)
  const viewBoxWidth = Math.floor(rects.height)

  if (rects.width === 0 && rects.height === 0) {
    svg.rects = 'N/A'
  } else if (
    svg.originalSvg.hasAttribute('width') &&
    svg.originalSvg.hasAttribute('height')
  ) {
    const width = svg.originalSvg.getAttribute('width')
    const height = svg.originalSvg.getAttribute('height')
    if (width.includes('100%')) {
      svg.rects = '100%'
    } else if (width.includes('px')) {
      svg.rects = `${width.slice(0, -2)}x${height.slice(0, -2)}`
    } else {
      svg.rects = `${width}x${height}`
    }
  } else {
    svg.rects = `${viewBoxWidth}x${viewBoxHeight}`
  }

  svg.svgClone = svg.originalSvg.cloneNode(true)
  svg.svgClone.setAttribute('class', 'gob__card__svg__trick')
  svg.svgClone.removeAttribute('height')
  svg.svgClone.removeAttribute('width')
  svg.svgClone.removeAttribute('style')

  if (!svg.svgClone.hasAttribute('viewBox')) {
    svg.svgClone.setAttribute('viewBox', `0 0 ${viewBoxHeight} ${viewBoxWidth}`)
  }

  if (svg.svgClone.getAttribute('viewBox') === '0 0 0 0') {
    svg.svgClone.setAttribute('viewBox', `0 0 24 24`)
  }

  svg.svgClone.setAttribute('preserveAspectRatio', 'xMidYMid meet')
}

async function checkForWhite(svg) {
  const whiteStrings = ['white', '#FFF', '#FFFFFF', '#fff', '#ffffff']

  for (const string of whiteStrings) {
    if (svg.svgString.includes(string)) {
      svg.hasWhite = true
    }
  }
}

async function organizeSVGs() {
  let allSVGs = findSVGs()

  allSVGs = allSVGs.map(async svg => {
    await generateSvgString(svg)
    await cleanupXML(svg)
    await checkForWhite(svg)
    return svg
  })

  allSVGs = await Promise.all(allSVGs)

  return allSVGs
}

export default organizeSVGs
