export function prettyName(uglyName) {
  return uglyName.replace(/[^a-z0-9]/gi, '-').toLowerCase()
}
