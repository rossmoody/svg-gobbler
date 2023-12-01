import { Fragment, useRef, useState } from 'react'
import { Button, Modal } from 'src/components'
import { useCollection, useDashboard } from 'src/providers'
import { useMainActions } from './use-main-actions'

export const CopyItemModal = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const { state: dashboardState } = useDashboard()
  const { state: collectionState } = useCollection()
  const { copySelectedItems } = useMainActions()
  const collectionSelectRef = useRef<HTMLSelectElement>(null)

  const openModal = () => {
    setModalOpen(true)
  }

  const copyItemsToCollection = () => {
    const selectedCollectionId = collectionSelectRef.current?.value
    if (!selectedCollectionId) return
    copySelectedItems(selectedCollectionId)
    setModalOpen(false)
  }

  const options = dashboardState.collections.filter(
    (collection) => collection.id !== collectionState.collectionId,
  )

  return (
    <Fragment>
      <Button variant="ghost" size="xs" onClick={openModal}>
        Copy
      </Button>
      <Modal open={isModalOpen} setOpen={setModalOpen}>
        <Modal.Header>Copy items to collection</Modal.Header>
        <div className="py-3">
          <label htmlFor="collection" className="label">
            Name
          </label>
          <select ref={collectionSelectRef} id="collection" className="select">
            {options.map((collection) => (
              <option value={collection.id} key={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
        </div>
        <Modal.Footer>
          <Button onClick={copyItemsToCollection}>Submit</Button>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
