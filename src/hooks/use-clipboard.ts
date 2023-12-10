import { useState } from 'react'

/**
 * Copies a given string to the clipboard.
 * Changes the text to 'Copied' for 1 second after copying.
 */
export const useClipboard = (label = 'Copy') => {
  const [text, setText] = useState(label)

  const copyToClipboard = (text: string) => {
    setText('Copied')
    navigator.clipboard.writeText(text)
    setTimeout(() => {
      setText(label)
    }, 1000)
  }

  return {
    copyToClipboard,
    text,
  }
}
