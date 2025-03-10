import { useEffect } from 'react'
import { type UserState, useUser } from 'src/providers'
import { StorageUtils } from 'src/utils/storage-utils'

import { SvgUtils } from '../utils/svg-utils'
import { useUpload } from './use-upload'

/**
 * Hook to listen for a paste event and upload the pasted SVG if it is valid.
 * Also sets the onboarding flag to true if the user pastes an SVG.
 */
export const usePastedSvg = () => {
  const { dispatch, state } = useUser()
  const upload = useUpload()

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      // Prevent pasting SVGs when the upload modal is visible
      const uploadModalVisible = document.getElementById('upload-modal')
      if (uploadModalVisible) return

      const pastedText = event.clipboardData?.getData('text/plain')

      if (pastedText && SvgUtils.isValidSvg(pastedText)) {
        event.preventDefault()
        upload([pastedText])

        const payload: UserState = {
          ...state,
          onboarding: { ...state.onboarding, hasPastedSvg: true, viewedSvgInClipboard: true },
        }
        StorageUtils.setStorageData('user', payload)
        dispatch({ payload, type: 'set-user' })
      }
    }

    window.addEventListener('paste', handlePaste)
    return () => {
      window.removeEventListener('paste', handlePaste)
    }
  }, [upload, state, dispatch])
}
