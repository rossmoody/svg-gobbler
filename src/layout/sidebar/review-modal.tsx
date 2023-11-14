import { MegaphoneIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { Button, Modal } from 'src/components'
import { links } from 'src/data/links'

export const ReviewModal = () => {
  const [open, setOpen] = useState(false)

  const webstoreLink = () => {
    return navigator.userAgent.includes('Firefox') ? links.firefoxWebstore : links.chromeWebstore
  }

  return (
    <Fragment>
      <button onClick={() => setOpen(true)} className="collection-item">
        <MegaphoneIcon className="h-4 w-4 shrink-0 " aria-hidden="true" />
        Leave a review
      </button>
      <Modal open={open} setOpen={setOpen}>
        <Modal.Header>Leave a review</Modal.Header>
        <p className="text-muted text-base">
          SVG Gobbler is free, open-source, and runs entirely on positive vibes. If you are
          experiencing a problem, please allow me to fix the issue before submitting a bad review.
          If you’re having a great experience, then by all means, let it rain.
        </p>
        <Modal.Footer>
          <Button
            size="lg"
            type="submit"
            onClick={() => {
              window.open(webstoreLink(), '_blank')
              setOpen(false)
            }}
          >
            Submit a review
          </Button>
          <Button
            size="lg"
            variant="secondary"
            type="button"
            onClick={() => {
              window.open(links.githubIssuesNew, '_blank')
              setOpen(false)
            }}
          >
            File an issue
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
