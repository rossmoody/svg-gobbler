import findSVGs from '../../src/scripts/find-svgs'

async function gather() {
  const data = await findSVGs()
  chrome.runtime.sendMessage({
    message: { data },
    url: 'index.html',
  })
}

gather()
