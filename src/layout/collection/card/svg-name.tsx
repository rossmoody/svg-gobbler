import { useCollection } from 'src/providers'

import { Transition } from '@headlessui/react'
import { CardData } from '.'

export const SvgName = ({ data }: CardData) => {
  const { state } = useCollection()

  return (
    <Transition
      as="div"
      enter="transition-opacity duration-300 ease-in-out"
      enterFrom="opacity-0 h-0"
      enterTo="opacity-100 h-8"
      leave="transition-opacity duration-300 ease-in-out"
      leaveFrom="opacity-100 h-8"
      leaveTo="opacity-0 h-0"
      show={state.view.filters['show-name']}
      className="h-8 w-full whitespace-nowrap px-2 pb-1 text-xs text-gray-500 dark:text-gray-400"
    >
      <span className="flex h-full w-full items-center justify-center">
        <span
          suppressContentEditableWarning
          contentEditable="plaintext-only"
          className="max-w-full overflow-hidden rounded-sm p-1 hover:bg-gray-100 dark:hover:bg-gray-900"
        >
          {data.name}
        </span>
      </span>
    </Transition>
  )
}
