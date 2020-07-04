import build from '../../src/scripts/index'

// This function gets called in background.js when
// a message is received that contains data
function gobble(data) {
  build(data)
  console.log(data)
}

export default gobble
