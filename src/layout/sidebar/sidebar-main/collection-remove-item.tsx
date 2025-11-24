import { XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { Button, Modal } from 'src/components'
import { useRemoveCollection } from 'src/hooks/use-remove-collection'
import { useUser } from 'src/providers'
import { loc } from 'src/utilities/i18n'

import { type CollectionItemProperties } from './collection-item'

export const CollectionRemoveItem = ({ collection }: CollectionItemProperties) => {
  const [open, setOpen] = useState(false)
  const { state } = useUser()
  const handleRemoveCollection = useRemoveCollection(collection)

  const onClose = () => {
    setOpen(false)
  }

  const handleRemoveCollectionAttempt = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (state.settings.warnOnRemoveCollection) {
      return setOpen(true)
    }
    handleRemoveCollection()
  }

  return (
    <Fragment>
      <button
        className="z-10 flex h-5 w-5 items-center justify-center rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-900"
        onClick={handleRemoveCollectionAttempt}
      >
        <XMarkIcon className="h-4" />
      </button>
      <Modal open={open} setOpen={setOpen}>
        <Modal.Header>
          {loc('you_sure')} "{collection.name}"?
        </Modal.Header>
        <Modal.Main>{loc('undone')}</Modal.Main>
        <Modal.Footer>
          <Button onClick={handleRemoveCollection} size="lg">
            {loc('remove')}
          </Button>
          <Button onClick={onClose} size="lg" variant="secondary">
            {loc('cancel')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}
