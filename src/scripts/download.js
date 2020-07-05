import FileSaver from 'file-saver'

const download = {
  createRegDownload(i) {
    const blob = new Blob([i.svgString], { type: 'text/xml' })
    FileSaver.saveAs(blob, 'gobbler-icon.svg')
  },

  copyRegClipboard(i) {
    const el = document.createElement('textarea')
    el.value = i.svgString
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  },

  copyIsolatedSVG() {
    const docEl = document.documentElement
    const string = new XMLSerializer().serializeToString(docEl)
    navigator.clipboard.writeText(string).then(
      () => {
        alert('The SVG was copied to your clipboard.')
      },
      err => {
        alert('Could not copy:', err)
      }
    )
  },
}

export default download
