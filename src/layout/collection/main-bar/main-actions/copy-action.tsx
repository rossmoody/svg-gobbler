import { Fragment, useRef, useState } from 'react'
import { Button, Modal } from 'src/components'
import { useCollection, useDashboard } from 'src/providers'
import { loc } from 'src/utils/i18n'

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
      <Button onClick={openModal} size="xs" variant="ghost">
        {loc('main_copy')}
      </Button>
      <Modal open={isModalOpen} setOpen={setModalOpen}>
        <Modal.Header>{loc('main_copy_collection')}</Modal.Header>
        <div className="py-3">
          <label className="label" htmlFor="collection">
            {loc('main_name')}
          </label>
          <select className="select" id="collection" ref={collectionSelectRef}>
            {options.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
        </div>
        <Modal.Footer>
          <Button onClick={copyItemsToCollection}>{loc('main_submit')}</Button>
          <Button onClick={() => setModalOpen(false)} variant="secondary">
            {loc('main_cancel')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
