import { Transition } from '@headlessui/react'
import { useMemo } from 'react'
import { useNavigation } from 'react-router-dom'
import { useMain, useSidebar } from 'src/providers'

export const CollectionTitle = () => {
  const { state: mainState } = useMain()
  const { state: sidebarState, dispatch: sidebarDispatch } = useSidebar()
  const navigation = useNavigation()
  console.log(navigation)

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
      chrome.storage.local.set({ collections: newCollections })
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
        className="text-lg font-semibold px-2 py-1 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md focus-within:outline-red-300 dark:focus-within:outline-red-500"
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
