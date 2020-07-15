const modal = document.querySelector('.modal')

function attachModalListeners(modalElm) {
  modalElm.querySelector('.close_modal').addEventListener('click', toggleModal)
  modalElm.querySelector('.overlay').addEventListener('click', toggleModal)
}

function detachModalListeners(modalElm) {
  modalElm
    .querySelector('.close_modal')
    .removeEventListener('click', toggleModal)
  modalElm.querySelector('.overlay').removeEventListener('click', toggleModal)
}

function toggleModal() {
  const currentState = modal.style.display

  // If modal is visible, hide it. Else, display it.
  if (currentState === 'none') {
    modal.style.display = 'block'
    attachModalListeners(modal)
  } else {
    modal.style.display = 'none'
    detachModalListeners(modal)
  }
}

export default toggleModal
