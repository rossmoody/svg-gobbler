export const gobbler = () => {
  const findSVGs = () => {
    // Collect all SVG content
    const svgTagLoc = Array.from(document.querySelectorAll('svg'))
    const svgObjLoc = Array.from(
      document.querySelectorAll('object[data*=".svg"]')
    )
    const svgImgLoc = Array.from(document.querySelectorAll('img[src*=".svg"]'))
    const allSVGs = svgTagLoc.concat(svgImgLoc, svgObjLoc)
    return allSVGs
  }

  const getLocation = allSVGs => {
    const svgInfo = []
    allSVGs.forEach(i => {
      const svgLoc = i.getBoundingClientRect()
      svgInfo.push({
        top: svgLoc.top,
        left: svgLoc.left,
        element: i,
      })
    })
    return svgInfo
  }

  const getSources = svgInfo => {
    svgInfo = svgInfo.map(i => {
      let serializer = new XMLSerializer()
      let parser = new DOMParser()
      let ajax = new XMLHttpRequest()
      if (i.element.hasAttribute('src')) {
        ajax.open('GET', i.element.src, true)
        ajax.send()
        ajax.onload = function(e) {
          let string = parser.parseFromString(
            ajax.responseText,
            'image/svg+xml'
          ).children[0]
          string = serializer.serializeToString(string)
          i.source = [string]
        }
        return i
      } else if (i.element.hasAttribute('data')) {
        ajax.open('GET', i.element.data, true)
        ajax.send()
        ajax.onload = function(e) {
          let string = parser.parseFromString(
            ajax.responseText,
            'image/svg+xml'
          ).children[0]
          string = serializer.serializeToString(string)
          i.source = [string]
        }
        return i
      } else {
        const string = serializer.serializeToString(i.element)
        i.source = [string]
        return i
      }
    })
    return svgInfo
  }

  const createDownload = svg => {
    let filename = 'svgeezy-icon'
    const url = window.URL.createObjectURL(
      new Blob(svg.source, { type: 'text/xml' })
    )

    const a = document.createElement('a')
    document.body.appendChild(a)
    a.setAttribute('download', `${filename}.svg`)
    a.setAttribute('href', url)
    a.click()
  }

  const createButtons = svgInfo => {
    const container = document.createElement('div')
    container.setAttribute('class', 'svg-gobbler')
    document.body.appendChild(container)

    svgInfo.forEach((svg, id) => {
      const btnContainer = document.createElement('div')
      container.appendChild(btnContainer)
      btnContainer.setAttribute('class', 'svg-gobbler__btn-container')
      btnContainer.style['top'] = `${svg.top + document.body.scrollTop}px`
      btnContainer.style['left'] = `${svg.left + document.body.scrollLeft}px`

      const btn = document.createElement('button')
      btnContainer.appendChild(btn)
      btn.setAttribute('class', 'svg-gobbler__btn-container__btn')
      btn.setAttribute('data-source-id', id)
      btn.textContent = 'Download'

      btn.onclick = () => {
        createDownload(svg)
      }
    })
  }

  // const processSVG = (svg) => {

  // }

  const getSVGeez = () => {
    // Find svg content
    const allSVGs = findSVGs()

    // Log location info
    let svgInfo = getLocation(allSVGs)

    // Log source information
    svgInfo = getSources(svgInfo)

    // Create buttons
    createButtons(svgInfo)
  }

  getSVGeez()
}
