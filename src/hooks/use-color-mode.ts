import { useEffect, useState } from 'react'

type ColorMode = 'light' | 'dark'

export function useColorMode() {
  const [colorMode, setColorMode] = useState<ColorMode>('light')

  useEffect(() => {
    chrome.storage.local.get(['colorMode'], (result) => {
      const value = (result.colorMode || 'light') as ColorMode
      setColorMode(value)
      setColorModeClass(value)
    })
  }, [])

  const toggleColorMode = () => {
    const value = colorMode === 'light' ? 'dark' : 'light'

    chrome.storage.local.set({ colorMode: value }, () => {
      setColorMode(value)
      setColorModeClass(value)
    })
  }

  function setColorModeClass(value: ColorMode) {
    const body = document.querySelector('body')

    if (body) {
      if (value === 'dark') {
        body.classList.add('dark')
      } else {
        body.classList.remove('dark')
      }
    }
  }

  return { colorMode, toggleColorMode }
}

export default useColorMode
