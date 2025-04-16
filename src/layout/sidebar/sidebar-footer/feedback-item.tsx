import { MegaphoneIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Button, Modal } from 'src/components'
import { useDatabase } from 'src/hooks'
import { loc } from 'src/utils/i18n'

export const FeedbackItem = () => {
  const [open, setOpen] = useState(false)
  const sendMessage = useDatabase('feedback')

  const handleRequestPrompt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get('feedback-email')
    const feedback = formData.get('feedback-textarea')
    const message = `Email: ${email}\nFeedback: ${feedback}`
    sendMessage(message)
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
        <form onSubmit={handleRequestPrompt}>
          <Modal.Header>{loc('sidebar_feedback')}</Modal.Header>
          <label className="label" htmlFor="feedback-email">
            {loc('feedback_email')}{' '}
            <span className="text-xs text-gray-500">{loc('feedback_email_optional')}</span>
          </label>
          <div className="mb-2 text-xs text-gray-600 dark:text-gray-400">
            {loc('feedback_email_optional_description')}
          </div>
          <input className="input mb-4" id="feedback-email" name="feedback-email" type="email" />
          <label className="label" htmlFor="feedback-textarea">
            {loc('feedback_feedback')}
          </label>
          <textarea
            className="input h-32"
            id="feedback-textarea"
            name="feedback-textarea"
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
    </>
  )
}
