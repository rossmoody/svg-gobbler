import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Logo } from 'src/components'
import { useDashboard } from 'src/providers'

import { DndContext } from '@dnd-kit/core'
import { CollectionItem } from './collection-item'
import { SideFooter } from './sidebar-footer'
import { SidebarHeader } from './sidebar-header'

export const SidebarContent = () => {
  const { state } = useDashboard()

  return (
    <div className="surface flex grow flex-col gap-y-4 overflow-y-auto border-r border-gray-200 px-6 pb-5 dark:border-gray-800">
      <div className="mt-2 flex h-16 shrink-0 items-center">
        <Logo className="h-8 w-auto" />
      </div>
      <nav className="flex flex-1 flex-col" aria-label="Main Navigation">
        <div className="-mx-2 flex flex-1 flex-col gap-1.5">
          <h2 id="collections-heading" className="sr-only">
            Collections
          </h2>
          <SidebarHeader />
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
          <span className="flex-1" />
          <SideFooter />
        </div>
      </nav>
    </div>
  )
}
