import { Fragment, useRef, useState } from 'react'
import { Button, Modal } from 'src/components'
import { useDashboard } from 'src/providers'
import { loc } from 'src/utilities/i18n'

import { useMainActions } from './use-main-actions'

export const CopyItemModal = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const { state: dashboardState } = useDashboard()
  const { duplicateItems } = useMainActions()
  const collectionSelectReference = useRef<HTMLSelectElement>(null)

  const openModal = () => {
    setModalOpen(true)
  }

  const duplicateItemsToCollection = () => {
    const selectedCollectionId = collectionSelectReference.current?.value
    if (!selectedCollectionId) return
    duplicateItems(selectedCollectionId)
    setModalOpen(false)
  }

  const isDisabled = dashboardState.collections.length === 1

  return (
    <Fragment>
      <Button disabled={isDisabled} onClick={openModal} size="xs" variant="ghost">
        {loc('main_copy')}
      </Button>
      <Modal open={isModalOpen} setOpen={setModalOpen}>
        <Modal.Header>{loc('main_copy_collection')}</Modal.Header>
        <Modal.Main>
          <div className="py-3">
            <label className="label" htmlFor="collection">
              {loc('main_name')}
            </label>
            <select className="select" id="collection" ref={collectionSelectReference}>
              {dashboardState.collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
          </div>
        </Modal.Main>
        <Modal.Footer>
          <Button onClick={duplicateItemsToCollection}>{loc('main_submit')}</Button>
          <Button onClick={() => setModalOpen(false)} variant="secondary">
            {loc('main_cancel')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
