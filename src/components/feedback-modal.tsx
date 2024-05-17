import { useEffect, useState } from 'react'
import { UserState, useDashboard, useUser } from 'src/providers'
import { StorageUtils } from 'src/utils/storage-utils'

import { Button } from './button'
import { Modal } from './modal'

export const FeedbackModal = () => {
  const [open, setOpen] = useState(true)
  const { dispatch, state: userState } = useUser()

  const {
    state: { collections },
  } = useDashboard()

  useEffect(() => {
    const installDate = new Date(userState.installDate).getTime()
    const currentDate = new Date().getTime()
    const daysInstalled = Math.floor((currentDate - installDate) / (1000 * 60 * 60 * 24))

    if (!userState.onboarding.viewedFeatureRequest && daysInstalled > 7) {
      setOpen(true)
    }
  }, [collections.length, userState.onboarding.viewedFeatureRequest, userState.installDate])

  const setRequestModalViewed = () => {
    const payload: UserState = {
      ...userState,
      onboarding: {
        ...userState.onboarding,
        viewedFeatureRequest: true,
      },
    }

    StorageUtils.setStorageData('user', payload)
    dispatch({ payload, type: 'set-user' })
    setOpen(false)
  }

  const onClose = () => {
    setOpen(false)
  }

  const handleRequestPrompt = () => {
    // Send feedback to the server
    setRequestModalViewed()
  }

  return (
    <Modal onClose={onClose} open={open} setOpen={setOpen}>
      <Modal.Header>👋 Hey, what is one feature you think SVG Gobbler is missing?</Modal.Header>
      <textarea className="input h-32" placeholder="I wish SVG Gobbler was able to..." />
      <Modal.Footer>
        <Button onClick={handleRequestPrompt} size="lg">
          Submit
        </Button>
        <Button onClick={onClose} size="lg" type="button" variant="secondary">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
