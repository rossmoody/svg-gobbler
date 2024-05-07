import { useEffect, useState } from 'react'
import { useCollection } from 'src/providers'
import { StorageUtils } from 'src/utils/storage-utils'

import { type CollectionData } from '../types'

type ColorMode = 'dark' | 'light'

export function useColorMode() {
  const [colorMode, setColorMode] = useState<ColorMode>('light')
  const { dispatch, state } = useCollection()

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
    const view: CollectionData['view'] = {
      ...state.view,
      canvas: value === 'dark' ? '#1A2338' : '#fff',
    }
    document.body.classList.toggle('dark', value === 'dark')
    dispatch({ payload: view, type: 'set-view' })
    StorageUtils.setStorageData('view', view)
  }

  return { colorMode, toggleColorMode }
}

export default useColorMode
