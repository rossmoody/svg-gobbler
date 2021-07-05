import React from 'react'
import ReactDOM from 'react-dom'

/**
 * Opting for an inline solution instead of Chakra
 * to limit the amount of code being injected into tab
 */
const Empty = () => {
  const ariaLabel = 'Sad smiley'

  setTimeout(() => {
    document.getElementById('gobbler')?.remove()
  }, 4000)

  return (
    <div
      style={{
        position: 'fixed',
        left: '0',
        right: '0',
        top: '28px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'max-content',
        background: 'white',
        zIndex: 10000,
        textAlign: 'center',
        fontSize: '18px',
        padding: '12px 24px',
        borderRadius: '48px',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 12px 25px -12px',
      }}
    >
      <p>
        <span role="img" aria-label={ariaLabel}>
          😢
        </span>{' '}
        No available SVGs to gobble on this page
      </p>
    </div>
  )
}

function createEmptyState() {
  const bodyElement = document.querySelector('body')!
  const rootDiv = document.createElement('div')
  rootDiv.id = 'gobbler'

  bodyElement.insertAdjacentElement('afterbegin', rootDiv)

  ReactDOM.render(<Empty />, rootDiv)
}

export default createEmptyState
