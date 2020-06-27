import FileSaver from 'file-saver'

function fileName() {
  let site = document.domain
  // prefixes
  site = site.replace(/https|www|http/g, '')
  // suffixes
  site = site.replace(
    /\.|com|gov|com|net|org|info|coop|int|co\.uk|org\.uk|ac\.uk|uk/g,
    ''
  )
  return `icon-${site}`
}

class ButtonHandler {
  createRegDownload(i) {
    const filename = fileName()
    let blob = new Blob([i.svgString], { type: 'text/xml' })
    FileSaver.saveAs(blob, `${filename}.svg`)
  }

  copyRegClipboard(i) {
    const el = document.createElement('textarea')
    el.value = i.svgString
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
}

export const download = new ButtonHandler()
