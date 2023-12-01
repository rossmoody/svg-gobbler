import { Fragment, useRef, useState } from 'react'
import { Button, Modal } from 'src/components'
import { useCollectionActions } from 'src/hooks'
import { useCollection, useDashboard } from 'src/providers'

export const MoveItemModal = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const { state: dashboardState } = useDashboard()
  const { state: collectionState } = useCollection()
  const { moveSelectedItems } = useCollectionActions()
  const collectionSelectRef = useRef<HTMLSelectElement>(null)

  const openModal = () => {
    setModalOpen(true)
  }

  const moveItemsToCollection = () => {
    const selectedCollectionId = collectionSelectRef.current?.value
    if (!selectedCollectionId) return
    moveSelectedItems(selectedCollectionId)
    setModalOpen(false)
  }

  const options = dashboardState.collections.filter(
    (collection) => collection.id !== collectionState.collectionId,
  )

  return (
    <Fragment>
      <Button variant="ghost" size="xs" onClick={openModal}>
        Move
      </Button>

      <Modal open={isModalOpen} setOpen={setModalOpen}>
        <Modal.Header>Move items to collection</Modal.Header>
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
        <Modal.Footer>
          <Button onClick={moveItemsToCollection}>Submit</Button>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
