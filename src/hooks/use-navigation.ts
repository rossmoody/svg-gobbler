/**
 * SVG Gobbler runs in a webview, so we can't use the browser's history to navigate back.
 * Instead, we use React Router's `useNavigate` hook to navigate around the app.
 */

import { useNavigate } from 'react-router-dom'

export const useNavigation = () => {
  const navigate = useNavigate()

  const handleNavigation = (event: KeyboardEvent) => {
    if (event.metaKey && event.key === '[') {
      navigate(-1)
    }

    if (event.metaKey && event.key === ']') {
      navigate(1)
    }
  }

  globalThis.addEventListener('keydown', handleNavigation)

  return () => {
    globalThis.removeEventListener('keydown', handleNavigation)
  }
}
