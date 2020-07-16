import FileSaver from 'file-saver'
import JSZip from 'jszip'

import SVGO from 'svgo'

const svgo = new SVGO({ removeViewBox: false, removeDimensions: true })

const download = {
  original(i) {
    const blob = new Blob([i], { type: 'text/xml' })
    FileSaver.saveAs(blob, 'gobbler-original.svg')
  },

  copyOriginal(i) {
    const el = document.createElement('textarea')
    el.value = i
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  },

  optimized(i) {
    svgo.optimize(i).then(result => {
      const blob = new Blob([result.data], { type: 'text/xml' })
      FileSaver.saveAs(blob, 'gobbler-icon.svg')
    })
  },

  copyOptimized(i) {
    const el = document.createElement('textarea')

    svgo.optimize(i).then(result => {
      el.value = result.data
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    })
  },

  all(i) {
    const zip = new JSZip()
    const optiArr = i.map(async svg => {
      const o = await svgo.optimize(svg.svgString)
      return o.data
    })

    optiArr.forEach((svg, index) => {
      zip.file(`svg-${index}.svg`, svg)
    })

    zip.generateAsync({ type: 'blob' }).then(content => {
      FileSaver.saveAs(content, 'gobbled_svgs.zip')
    })
  },

  img(i, width, height) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    ctx.drawImage(i, 0, 0)
    const dataUri = canvas.toDataURL('image/png', 0.9)
    FileSaver.saveAs(dataUri, 'gobbler-image.png')
  },
}

export default download
