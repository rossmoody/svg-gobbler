import { Transition } from '@headlessui/react'
import { useCollection } from 'src/providers'

import { CopyItemModal } from './copy-action'
import { DeleteAction } from './delete-action'
import { MoveItemModal } from './move-action'

export const MainActions = () => {
  const { state } = useCollection()

  return (
    <Transition
      enter="transition ease-in-out duration-150"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in-out duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={state.selected.length > 0}
    >
      <div className="flex items-center gap-2">
        <div aria-hidden className="h-4 w-px bg-gray-200 dark:bg-gray-700" />
        <MoveItemModal />
        <CopyItemModal />
        <DeleteAction />
      </div>
    </Transition>
  )
}
