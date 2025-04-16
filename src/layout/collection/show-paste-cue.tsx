import { useEffect, useState } from 'react'
import { Toast } from 'src/components'
import { type UserState, useUser } from 'src/providers'
import { loc } from 'src/utils/i18n'
import { StorageUtilities } from 'src/utils/storage-utilities'

/**
 * A toast that educates the user about the ability to paste SVGs into the app.
 */
export const ShowPasteCue = () => {
  const [show, setShow] = useState(false)
  const { dispatch: userDispatch, state: userState } = useUser()

  useEffect(() => {
    if (userState.onboarding.hasPastedSvg && !userState.onboarding.viewedSvgInClipboard) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [userState.onboarding.hasPastedSvg, userState.onboarding.viewedSvgInClipboard])

  const setReviewPromptViewed = () => {
    const payload: UserState = {
      ...userState,
      onboarding: { ...userState.onboarding, viewedSvgInClipboard: true },
    }
    StorageUtilities.setStorageData('user', payload)
    userDispatch({ payload, type: 'set-user' })
    setShow(false)
  }

  return (
    <Toast
      actionText={loc('paste_cue_action')}
      description={loc('paste_cue_desc')}
      onAction={setReviewPromptViewed}
      open={show}
      title={loc('paste_cue_title')}
    />
  )
}
