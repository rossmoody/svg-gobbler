import download from './download'

function getViewBox(i) {
  let viewBox
  let height
  let width

  const children = i.childNodes
  const arr = [i, ...children]

  for (const node of arr) {
    if (node.nodeType === 1) {
      for (const name of node.getAttributeNames()) {
        const value = node.getAttribute(name)

        if (name === 'viewBox') {
          viewBox = value
          break
        } else if (name === 'height') {
          height = value
        } else if (name === 'width') {
          width = value
        }
      }
    }
  }

  const backupViewBox = `0 0 ${width} ${height}`

  if (viewBox) {
    const sizeArr = viewBox.split(' ')
    ;[, , width, height] = sizeArr
  } else {
    viewBox = backupViewBox
  }

  const specs = {
    viewBox,
    width,
    height,
  }

  return specs
}

function removeSizes(i) {
  const canvasSVG = i.cloneNode(true)
  canvasSVG.height && canvasSVG.removeAttribute('height')
  canvasSVG.width && canvasSVG.removeAttribute('width')
  canvasSVG.viewBox && canvasSVG.removeAttribute('viewBox')
  const firstChild = canvasSVG.firstElementChild
  firstChild.height && firstChild.removeAttribute('height')
  firstChild.width && firstChild.removeAttribute('width')
  firstChild.viewBox && firstChild.removeAttribute('viewBox')
  // may want to delete preserveAspectRatio
  return canvasSVG
}

function buildImg(i) {
  const svgString = new XMLSerializer().serializeToString(i)

  const img = document.createElement('img')

  const decoded = unescape(encodeURIComponent(svgString))

  const base64 = btoa(decoded)

  const imgSource = `data:image/svg+xml;base64,${base64}`

  img.setAttribute('src', imgSource)

  return img
}

function setSizeString(specs, i) {
  let value = i
  if (!value) {
    value = 1
    const select = document.getElementById('canvas-select')
    select.value = value
  }

  let width = parseInt(specs.width, 10)
  let height = parseInt(specs.height, 10)

  width *= value
  height *= value

  const id = document.querySelector('#canvas-sizes')
  const { firstChild } = id
  firstChild && firstChild.remove()

  id.insertAdjacentHTML('afterbegin', `<span>${width}x${height}</span>`)
}

function resetDisplayImg(i, specs) {
  // Find and remove existing image
  const imgCont = document.querySelector('#img-container')
  imgCont.remove()
  const newImgCont = document.createElement('div')
  newImgCont.id = 'img-container'
  document.querySelector('.modal_image_wrap').appendChild(newImgCont)

  // Build new img
  const img = buildImg(i)
  newImgCont.appendChild(img)
  setSizeString(specs)
}

function buildModal(i) {
  // Create svg element from string
  const iDoc = new DOMParser().parseFromString(i, 'image/svg+xml')
  const svg = iDoc.documentElement

  // Cleanup SVG string for img
  const specs = getViewBox(svg)
  const svgElement = removeSizes(svg)
  svgElement.setAttribute('viewBox', specs.viewBox)

  // Insert img with cleaned up svg element
  resetDisplayImg(svgElement, specs)

  // Update height/width on change
  const canvasSelect = document.getElementById('canvas-select')
  canvasSelect.addEventListener('input', event => {
    setSizeString(specs, event.target.value)
  })

  // Download function
  function exportImg() {
    const select = document.getElementById('canvas-select')
    const { value } = select

    const width = specs.width * value
    const height = specs.height * value

    // Need to set explicit width and height or Firefox exports empty PNG
    svgElement.setAttribute('width', width)
    svgElement.setAttribute('height', height)

    const img = buildImg(svgElement)

    img.addEventListener('load', () => download.img(img, width, height))
  }

  // Set listener on export button
  const exportBtn = document.querySelector('#export-button')
  exportBtn.addEventListener('click', exportImg)

  // Listener to detach when modal closed
  document.querySelector('.close_modal').addEventListener('click', () => {
    exportBtn.removeEventListener('click', exportImg)
  })

  document.querySelector('.overlay').addEventListener('click', () => {
    exportBtn.removeEventListener('click', exportImg)
  })
}

export default buildModal
