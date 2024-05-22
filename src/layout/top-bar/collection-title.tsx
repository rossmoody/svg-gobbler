import { Transition } from '@headlessui/react'
import { useMemo } from 'react'
import { useCollection, useDashboard } from 'src/providers'
import { loc } from 'src/utils/i18n'
import { StorageUtils } from 'src/utils/storage-utils'

export const CollectionTitle = () => {
  const { state: mainState } = useCollection()
  const { dispatch: sidebarDispatch, state: sidebarState } = useDashboard()

  const title = useMemo(() => {
    return sidebarState.collections.find((c) => c.id === mainState.collectionId)?.name
  }, [mainState.collectionId, sidebarState.collections])

  function handleKeyDown(event: React.KeyboardEvent<HTMLHeadingElement>) {
    if (event.key === 'Enter') {
      event.currentTarget.blur()
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLHeadingElement>) {
    const newTitle = event.target.textContent ?? loc('topbar_collection')

    if (newTitle !== title) {
      const newCollections = sidebarState.collections.map((c) => {
        if (c.id === mainState.collectionId) {
          return { ...c, name: newTitle }
        }
        return c
      })
      sidebarDispatch({ payload: newCollections, type: 'set-collections' })
      StorageUtils.setStorageData('collections', newCollections)
    }
  }

  return (
    <Transition
      appear
      enter="transition-all ease-linear duration-500"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      show={!!title}
    >
      <h1
        className="focus -ml-2 whitespace-nowrap rounded-md px-2 py-1 text-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
        // @ts-ignore https://github.com/facebook/react/issues/27619
        contentEditable="plaintext-only"
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning
      >
        {title}
      </h1>
    </Transition>
  )
}
