import { Transition } from '@headlessui/react'
import { useMemo } from 'react'
import { useCollection, useDashboard } from 'src/providers'
import { StorageUtils } from 'src/utils/storage-utils'

export const CollectionTitle = () => {
  const { state: mainState } = useCollection()
  const { state: sidebarState, dispatch: sidebarDispatch } = useDashboard()

  const title = useMemo(() => {
    return sidebarState.collections.find((c) => c.id === mainState.collectionId)?.name
  }, [mainState.collectionId, sidebarState.collections])

  function handleKeyDown(event: React.KeyboardEvent<HTMLHeadingElement>) {
    if (event.key === 'Enter') {
      event.currentTarget.blur()
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLHeadingElement>) {
    const newTitle = event.target.textContent ?? 'Collection'
    if (newTitle !== title) {
      const newCollections = sidebarState.collections.map((c) => {
        if (c.id === mainState.collectionId) {
          return { ...c, name: newTitle }
        }
        return c
      })
      sidebarDispatch({ type: 'set-collections', payload: newCollections })
      StorageUtils.setPageData('collections', newCollections)
    }
  }

  return (
    <Transition
      appear
      show={!!title}
      enter="transition-all ease-linear duration-500"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
    >
      <h1
        className="focus -ml-2 whitespace-nowrap rounded-md px-2 py-1 text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
        // @ts-ignore https://github.com/facebook/react/issues/27619
        contentEditable="plaintext-only"
        suppressContentEditableWarning
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      >
        {title}
      </h1>
    </Transition>
  )
}
