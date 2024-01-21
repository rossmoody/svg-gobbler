import { MegaphoneIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { Button, Modal } from 'src/components'
import { links } from 'src/constants/links'

export const ReviewModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <button className="collection-item" onClick={() => setOpen(true)}>
        <MegaphoneIcon aria-hidden="true" className="h-4 w-4 shrink-0 " />
        Leave a review
      </button>
      <Modal open={open} setOpen={setOpen}>
        <Modal.Header>Support SVG Gobbler</Modal.Header>
        <div className="text-muted flex flex-col gap-4 text-sm">
          <p>
            SVG Gobbler is{' '}
            <span className="font-semibold">
              free, open-source, and runs entirely on positive vibes
            </span>
            . If you are experiencing a problem or want missing functionality, please raise an issue
            to be fixed before submitting a bad review.
          </p>
          <p>If you’re having a great experience, then by all means, let it rain. 🚀</p>
        </div>
        <Modal.Footer>
          <Button
            onClick={() => {
              window.open(links.chromeWebstore, '_blank')
              setOpen(false)
            }}
            size="lg"
            type="submit"
          >
            Give a review
          </Button>
          <Button
            onClick={() => {
              window.open(links.githubIssuesNew, '_blank')
              setOpen(false)
            }}
            size="lg"
            type="button"
            variant="secondary"
          >
            Submit feedback
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
