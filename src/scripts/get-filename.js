import { prettyName } from './util'

export function getFilename(i) {
  let filename = 'gobble'
  if (i.alt) {
    filename = prettyName(i.alt)
  } else if (i.id) {
    filename = prettyName(i.id)
  } else if (window.document.title) {
    filename = prettyName(window.document.title)
  }
  i.filename = filename
}
