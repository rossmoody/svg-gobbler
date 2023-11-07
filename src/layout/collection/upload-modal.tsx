import { Button, Modal, ModalProps } from 'src/components'

export const UploadModal = ({ open, setOpen }: ModalProps) => {
  return (
    <Modal open={open} setOpen={setOpen}>
      <Modal.Header>Upload</Modal.Header>
      <Modal.Footer>
        <Button size="lg" type="submit">
          Upload
        </Button>
        <Button size="lg" variant="secondary" onClick={() => setOpen(false)} type="button">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
