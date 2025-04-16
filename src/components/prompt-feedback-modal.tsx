import { useEffect, useState } from 'react'
import { useDatabase } from 'src/hooks'
import { useDashboard, UserState, useUser } from 'src/providers'
import { loc } from 'src/utils/i18n'
import { StorageUtilities } from 'src/utils/storage-utilities'

import { Button } from './button'
import { Modal } from './modal'

export const FeedbackModal = () => {
  const [open, setOpen] = useState(false)
  const sendMessage = useDatabase('feedback')
  const { dispatch, state: userState } = useUser()

  const {
    state: { collections },
  } = useDashboard()

  useEffect(() => {
    const installDate = new Date(userState.installDate).getTime()
    const currentDate = Date.now()
    const daysInstalled = Math.floor((currentDate - installDate) / (1000 * 60 * 60 * 24))

    if (!userState.onboarding.viewedFeatureRequest && daysInstalled >= 5) {
      setTimeout(() => setOpen(true), 5000)
    }
  }, [collections.length, userState.onboarding.viewedFeatureRequest, userState.installDate])

  const handleRequestPrompt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('feedback-email')
    const feedback = formData.get('feedback-textarea')
    const message = `Email: ${email}\nFeedback: ${feedback}`
    sendMessage(message)
    onClose()
  }

  const setRequestModalViewed = () => {
    const payload: UserState = {
      ...userState,
      onboarding: {
        ...userState.onboarding,
        viewedFeatureRequest: true,
      },
    }
    StorageUtilities.setStorageData('user', payload)
    dispatch({ payload, type: 'set-user' })
  }

  const onClose = () => {
    setRequestModalViewed()
    setOpen(false)
  }

  return (
    <Modal onClose={onClose} open={open} setOpen={setOpen}>
      <form onSubmit={handleRequestPrompt}>
        <Modal.Header>👋 {loc('feedback_title')}</Modal.Header>
        <label className="label" htmlFor="feedback-email">
          {loc('feedback_email')}{' '}
          <span className="text-xs text-gray-500">{loc('feedback_email_optional')}</span>
        </label>
        <input className="input mb-4" id="feedback-email" name="feedback-email" type="email" />
        <label className="label" htmlFor="feedback-textarea">
          {loc('feedback_feedback')}
        </label>
        <textarea
          className="input h-32"
          id="feedback-textarea"
          name="feedback-textarea"
          placeholder={loc('feedback_placeholder')}
          required
        />
        <Modal.Footer>
          <Button size="lg" type="submit">
            {loc('feedback_primary_action')}
          </Button>
          <Button onClick={onClose} size="lg" type="button" variant="secondary">
            {loc('feedback_secondary_action')}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
