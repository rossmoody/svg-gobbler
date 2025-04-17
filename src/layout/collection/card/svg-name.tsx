import { Transition } from '@headlessui/react'
import { useCollection } from 'src/providers'
import { StorageUtilities } from 'src/utilities/storage-utilities'

import { CardData } from '.'

export const SvgName = ({ data }: CardData) => {
  const { dispatch, state } = useCollection()

  const handleChange = async (event: React.FormEvent<HTMLSpanElement>) => {
    const name = (event.target as HTMLSpanElement).textContent
      ?.replace(/[\r\n]+/g, ' ')
      .replaceAll(/\s+/g, ' ')
      .trim()
    if (!name || name === data.name) return

    data.updateName(name)
    const pageData = await StorageUtilities.getPageData(state.collectionId)
    pageData.data = pageData.data.map((svg) => (svg.id === data.id ? data : svg))
    StorageUtilities.setPageData(state.collectionId, pageData)
    dispatch({ type: 'process-data' })
  }

  return (
    <Transition
      as="div"
      className="h-8 w-full whitespace-nowrap  px-2 pb-2 text-xs text-gray-500 dark:text-gray-400"
      enter="transition-opacity duration-300 ease-in-out"
      enterFrom="opacity-0 h-0"
      enterTo="opacity-100 h-8"
      leave="transition-opacity duration-300 ease-in-out"
      leaveFrom="opacity-100 h-8"
      leaveTo="opacity-0 h-0"
      show={state.view.filters['show-name']}
    >
      <span className="flex h-full w-full items-center justify-center">
        <span
          className="max-w-full overflow-hidden rounded-sm p-1 hover:bg-gray-100 dark:hover:bg-gray-900"
          contentEditable="plaintext-only"
          onBlur={handleChange}
          suppressContentEditableWarning
        >
          {data.name}
        </span>
      </span>
    </Transition>
  )
}
