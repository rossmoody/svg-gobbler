import { getFilename } from './get-filename'

////////////////
// Sets the SVG element to a property of itself and
// generates a filename based on the related info
export const getInfo = allSVGs => {
  allSVGs = allSVGs.map(i => {
    i.element = i
    getFilename(i)
    return i
  })
  return allSVGs
}
