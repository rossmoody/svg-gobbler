import { useEffect, useState } from 'react'
import { links } from 'src/constants/links'
import { useDashboard, useUser } from 'src/providers'
import { extension } from 'src/utilities/extension-utilities'
import { loc } from 'src/utilities/i18n'
import { StorageUtilities } from 'src/utilities/storage-utilities'

import { Toast } from './toast'

export const ReviewPrompt = () => {
  const [show, setShow] = useState(false)
  const { dispatch, state: userState } = useUser()

  const {
    state: { collections },
  } = useDashboard()

  useEffect(() => {
    if (
      collections.length >= 3 &&
      !userState.onboarding.viewedReview &&
      process.env.NODE_ENV === 'production'
    ) {
      setShow(true)
    }
  }, [collections.length, userState.onboarding.viewedReview])

  const setReviewPromptViewed = () => {
    const payload = { ...userState, onboarding: { ...userState.onboarding, viewedReview: true } }
    StorageUtilities.setStorageData('user', payload)
    dispatch({ payload, type: 'set-user' })
    setShow(false)
  }

  const handleReviewPrompt = () => {
    setReviewPromptViewed()
    const link = extension.isFirefox ? links.firefoxWebstore : links.chromeWebstore
    window.open(link, '_blank')
  }

  return (
    <Toast
      actionText={loc('review_primary_action')}
      description={loc('review_desc')}
      onAction={handleReviewPrompt}
      onSecondaryAction={setReviewPromptViewed}
      open={show}
      secondaryActionText={loc('review_secondary_action')}
      title={`${loc('review_title')} 👋`}
    />
  )
}
