import { DndContext } from '@dnd-kit/core'
import { Transition } from '@headlessui/react'
import { Fragment } from 'react/jsx-runtime'
import { useDashboard } from 'src/providers'
import { CollectionItem } from '../collection-item'

export const SidebarMain = () => {
  const { state } = useDashboard()

  return (
    <DndContext>
      <ul className="flex flex-col gap-1.5" role="list">
        {state.collections.map((collection, i) => (
          <Transition
            appear
            as={Fragment}
            enter="transition-all duration-300 ease-in-out"
            enterFrom="opacity-0 translate-y-2 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            key={collection.id}
            leave="transition-all duration-300 ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            show
          >
            <li key={collection.id} style={{ transitionDelay: `${i * 15}ms` }}>
              <CollectionItem collection={collection} />
            </li>
          </Transition>
        ))}
      </ul>
    </DndContext>
  )
}
