/**
 * SVG Gobbler runs in a webview, so we can't use the browser's history to navigate back.
 * Instead, we use React Router's `useNavigate` hook to navigate back to the previous page
 * when CMD and left bracket are pressed.
 */

import { useNavigate } from 'react-router-dom'

export const useNavigation = () => {
  const navigate = useNavigate()

  const handleNavigation = (event: KeyboardEvent) => {
    if (event.metaKey && event.key === '[') {
      navigate(-1)
    }
  }

  window.addEventListener('keydown', handleNavigation)

  return () => {
    window.removeEventListener('keydown', handleNavigation)
  }
}
