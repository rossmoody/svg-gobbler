import { Transition } from '@headlessui/react'
import { useMemo } from 'react'
import { useMain, useSidebar } from 'src/providers'

export const CollectionTitle = () => {
  const { state: mainState } = useMain()
  const { state: sidebarState } = useSidebar()

  const title = useMemo(() => {
    return sidebarState.collections.find((c) => c.id === mainState.collectionId)?.name
  }, [mainState.collectionId, sidebarState.collections])

  return (
    <Transition
      show={!!title}
      enter="transition-all ease-linear duration-500"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
    >
      <h1 className="text-lg font-semibold">{title}</h1>
    </Transition>
  )
}
