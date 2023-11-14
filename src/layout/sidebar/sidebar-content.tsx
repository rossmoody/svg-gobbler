import { Transition } from '@headlessui/react'
import { Cog6ToothIcon, MegaphoneIcon, PlusIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from 'src/components'
import { useDashboard } from 'src/providers'
import { CollectionItem } from './collection-item'
import { NewCollectionModal } from './new-collection-modal'

export const SidebarContent = () => {
  const [open, setOpen] = useState(false)
  const { state } = useDashboard()

  return (
    <div className="flex grow flex-col gap-y-4 overflow-y-auto border-r px-6 pb-5 border-gray-200 dark:border-gray-800 surface">
      <div className="flex h-16 shrink-0 items-center mt-2">
        <Logo className="h-8 w-auto" />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-1.5 -mx-2">
          <li>
            <button className="collection-item w-full" onClick={() => setOpen(true)}>
              <PlusIcon className="h-4 w-4" aria-hidden="true" />
              New collection
            </button>
            <NewCollectionModal open={open} setOpen={setOpen} />
          </li>
          <hr className="border-gray-200 dark:border-gray-800 mt-2 mb-5" />
          <li>
            <ul role="list" className="flex flex-col gap-1.5">
              {state.collections.map((collection, i) => (
                <Transition
                  show
                  appear
                  as={Fragment}
                  key={collection.id}
                  enter="transition-all duration-300 ease-in-out"
                  enterFrom="opacity-0 translate-y-2 scale-95"
                  enterTo="opacity-100 translate-y-0 scale-100"
                  leave="transition-all duration-300 ease-in-out"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <li key={collection.id} style={{ transitionDelay: `${i * 15}ms` }}>
                    <CollectionItem collection={collection} />
                  </li>
                </Transition>
              ))}
            </ul>
          </li>
          <li className="mt-auto pt-8">
            <NavLink to="settings" className="collection-item">
              <Cog6ToothIcon className="h-4 w-4 shrink-0 " aria-hidden="true" />
              Settings
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                chrome.tabs.update({ url: 'chrome://extensions/shortcuts' })
              }}
              className="collection-item"
            >
              <MegaphoneIcon className="h-4 w-4 shrink-0 " aria-hidden="true" />
              Leave a review
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
