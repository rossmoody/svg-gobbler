export const globalActions = () => {

  // Close gobbler
  function closeGobbler() {
    const gobbler = document.querySelector('.gob')
    gobbler.classList.add('gob--hide')
    setTimeout(() => {
      gobbler.remove()
    }, 500)
  }

  // Close event listeners
  document.querySelector('.gob__close').addEventListener('click', function() {
    closeGobbler()
  })

  document.querySelector('.gob__overlay').addEventListener('click', function() {
    closeGobbler()
  })

  // Header event listeners
  document
    .querySelector('.gob__feedback')
    .addEventListener('click', function() {
      var win = window.open('https://www.surveymonkey.com/r/WQJVQNQ', '_blank')
      win.focus()
    })
}
