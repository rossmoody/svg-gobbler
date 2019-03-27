export function removeDaGobbler() {
  const gobbler = document.getElementById('gobblegobble')

  // Remove the container
  function removeAllTheGobbles() {
    gobbler.remove()
  }

  // Event listener
  window.addEventListener('scroll', removeAllTheGobbles, { once: true })
}
