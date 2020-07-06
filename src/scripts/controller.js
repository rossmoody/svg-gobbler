import processSVGs from './process-svgs'

require('../styles/index.scss')

function noGobbles() {
  const style = document.createElement('style')
  style.innerHTML = `
  .gob__noGobbler {
    font-family: -apple-system, BlinkMacSystemFont, “Roboto”, “Droid Sans”,
    “Helvetica Neue”, Helvetica, Arial, sans-serif;
    z-index: 5000;
    padding: 16px 24px;
    background: white;
    font-size: 20px;
    color: #2d3341;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    line-height: 20px;
    border-radius: 60px;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    animation: 3s loadSadness ease-in-out 1;
    }

    @keyframes loadSadness {
        0% {
          opacity: 0;
          top: 0;
        }
      
        20% {
          opacity: 1;
          top: 90px;
        }
      
        90% {
          opacity: 1;
          top: 90px;
        }
      
        100% {
          opacity: 0;
          top: 0px;
        }
      }
  `
  document.head.appendChild(style)

  const noGobbler = document.createElement('div')
  noGobbler.classList.add('gob__noGobbler')
  noGobbler.innerHTML = `😢 Drats, couldn't find any SVGs to gobble`

  document.body.insertAdjacentElement('beforebegin', noGobbler)

  setTimeout(() => {
    noGobbler.remove()
    style.remove()
  }, 2900)
}

async function init() {
  const data = await processSVGs()
  try {
    if (data.length === 0) {
      noGobbles()
    } else {
      setTimeout(() => {
        // eslint-disable-next-line
        chrome.runtime.sendMessage(data)
      }, 100)
    }
  } catch (e) {
    console.log(e)
  }
}

init()
