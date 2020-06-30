const globalActions = () => {
  // Close gobbler
  function closeGobbler() {
    const gobbler = document.querySelector('.gob')
    gobbler.classList.add('gob--hide')
    setTimeout(() => {
      gobbler.remove()
    }, 500)
  }

  // Close event listeners
  document.querySelector('.gob__close').addEventListener('click', () => {
    closeGobbler()
  })

  document.querySelector('.gob__overlay').addEventListener('click', () => {
    closeGobbler()
  })
}

export default globalActions
