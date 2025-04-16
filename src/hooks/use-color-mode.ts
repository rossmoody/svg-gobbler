import { useEffect } from 'react'
import { CollectionState, useCollection } from 'src/providers'
import { StorageUtilities } from 'src/utils/storage-utilities'

export function useColorMode() {
  const { dispatch, state } = useCollection()

  useEffect(() => {
    document.body.classList.toggle('dark', state.view.colorMode === 'dark')
  }, [state.view.colorMode])

  const toggleColorMode = () => {
    const colorMode = state.view.colorMode === 'light' ? 'dark' : 'light'
    const canvas = colorMode === 'light' ? '#fff' : '#1A2338'

    const view: CollectionState['view'] = {
      ...state.view,
      canvas,
      colorMode,
    }

    document.body.classList.toggle('dark', colorMode === 'dark')
    dispatch({ payload: view, type: 'set-view' })
    StorageUtilities.setStorageData('view', view)
  }

  return { colorMode: state.view.colorMode, toggleColorMode }
}

export default useColorMode
