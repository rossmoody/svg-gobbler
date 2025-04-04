import { useRef, useState } from 'react'
import { useDatabase } from 'src/hooks'
import { loc } from 'src/utils/i18n'

import { MegaphoneIcon } from '@heroicons/react/24/outline'
import { Button, Modal } from 'src/components'

export const FeedbackItem = () => {
  const [open, setOpen] = useState(false)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const sendMessage = useDatabase('feedback')

  const handleRequestPrompt = async () => {
    sendMessage(textAreaRef.current?.value ?? 'No feedback message')
    onClose()
  }

  function onClose() {
    setOpen(false)
  }

  function onOpen() {
    setOpen(true)
  }

  return (
    <>
      <button className="collection-item" onClick={onOpen}>
        <MegaphoneIcon aria-hidden="true" className="h-4 w-4 shrink-0 " />
        {loc('sidebar_feedback')}
      </button>
      <Modal onClose={onClose} open={open} setOpen={setOpen}>
        <Modal.Header>{loc('sidebar_feedback')}</Modal.Header>
        <textarea
          className="input h-32"
          placeholder={loc('feedback_placeholder')}
          ref={textAreaRef}
        />
        <Modal.Footer>
          <Button onClick={handleRequestPrompt} size="lg">
            {loc('feedback_primary_action')}
          </Button>
          <Button onClick={onClose} size="lg" type="button" variant="secondary">
            {loc('feedback_secondary_action')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
