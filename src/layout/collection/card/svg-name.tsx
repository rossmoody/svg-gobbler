import { useCollection } from 'src/providers'

import { Transition } from '@headlessui/react'
import { StorageUtils } from 'src/utils/storage-utils'
import { CardData } from '.'

export const SvgName = ({ data }: CardData) => {
  const { state, dispatch } = useCollection()

  const handleChange = async (e: React.FormEvent<HTMLSpanElement>) => {
    const name = (e.target as HTMLSpanElement).textContent
      ?.replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    if (!name || name === data.name) return

    data.updateName(name)
    let pageData = await StorageUtils.getPageData(state.collectionId)
    pageData.data = pageData.data.map((svg) => (svg.id === data.id ? data : svg))
    StorageUtils.setPageData(state.collectionId, pageData)
    dispatch({ type: 'process-data' })
  }

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
      className="h-8 w-full whitespace-nowrap  px-2 pb-2 text-xs text-gray-500 dark:text-gray-400"
    >
      <span className="flex h-full w-full items-center justify-center">
        <span
          onBlur={handleChange}
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
