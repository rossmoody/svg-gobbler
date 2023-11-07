import { PlusIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { Button, Modal } from 'src/components'

export const UploadModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Upload
        <PlusIcon className="h-4 w-4" />
      </Button>

      <Modal open={open} setOpen={setOpen}>
        <Modal.Header>Upload</Modal.Header>
        <Modal.Content></Modal.Content>
        <Modal.Footer>
          <Button size="lg" type="submit">
            Create collection
          </Button>
          <Button size="lg" variant="secondary" onClick={() => setOpen(false)} type="button">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
