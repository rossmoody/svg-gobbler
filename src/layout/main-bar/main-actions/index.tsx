import { Transition } from '@headlessui/react'
import { Button } from 'src/components'
import { useCollection } from 'src/providers'
import { useMainActions } from './use-main-actions'

export const MainActions = () => {
  const { state, dispatch } = useCollection()
  const { deleteSelected } = useMainActions()

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
        <Button variant="ghost" size="xs">
          Move
        </Button>
        <Button variant="ghost" size="xs">
          Copy
        </Button>
        <Button variant="ghost" size="xs" onClick={deleteSelected}>
          Delete
        </Button>
      </div>
    </Transition>
  )
}
