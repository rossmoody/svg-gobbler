import { Transition } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Button } from 'src/components'
import { useCollection } from 'src/providers'
import { CopyItemModal } from './copy-action'
import { MoveItemModal } from './move-action'
import { useMainActions } from './use-main-actions'

export const MainActions = () => {
  const { state } = useCollection()
  const { deleteSelectedItems } = useMainActions()

  return (
    <Transition
      show={state.selected.length > 0}
      enter="transition ease-in-out duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in-out duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="flex items-center gap-2">
        <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" aria-hidden />
        <MoveItemModal />
        <CopyItemModal />
        <Button variant="ghost" size="xs" onClick={deleteSelectedItems}>
          <TrashIcon className="h-3 w-3" />
          Delete
        </Button>
      </div>
    </Transition>
  )
}
