import { Transition } from '@headlessui/react'
import {
  ArrowTopRightOnSquareIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from 'src/components'
import { links } from 'src/constants/links'
import { useDashboard } from 'src/providers'
import { loc } from 'src/utils/i18n'

import { CollectionItem } from './collection-item'
import { FeedbackItem } from './feedback-item'
import { NewCollectionModal } from './new-collection-modal'
import { ResetEnvironment } from './reset-environment'

export const SidebarContent = () => {
  const [open, setOpen] = useState(false)
  const { state } = useDashboard()

  function navigateToChromeWebStore() {
    window.open(links.chromeWebstore, '_blank')
  }

  return (
    <div className="surface flex grow flex-col gap-y-4 overflow-y-auto border-r border-gray-200 px-6 pb-5 dark:border-gray-800">
      <div className="mt-2 flex h-16 shrink-0 items-center">
        <Logo className="h-8 w-auto" />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="-mx-2 flex flex-1 flex-col gap-1.5" role="list">
          <li>
            <button className="collection-item w-full" onClick={() => setOpen(true)}>
              <PlusIcon aria-hidden="true" className="h-4 w-4" />
              {loc('sidebar_new_collection')}
            </button>
            <NewCollectionModal open={open} setOpen={setOpen} />
          </li>
          <hr className="mb-5 mt-2 border-gray-200 dark:border-gray-800" />
          <li>
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
          </li>
          <span className="flex-1" />
          <li className="pt-8">
            <NavLink className="collection-item" to="settings">
              <Cog6ToothIcon aria-hidden="true" className="h-4 w-4 shrink-0 " />
              {loc('sidebar_settings')}
            </NavLink>
          </li>
          <li>
            <FeedbackItem />
          </li>
          <li>
            <button className="collection-item group" onClick={navigateToChromeWebStore}>
              <PencilSquareIcon aria-hidden="true" className="h-4 w-4 shrink-0 " />
              {loc('sidebar_review')}
              <ArrowTopRightOnSquareIcon
                aria-hidden="true"
                className="h-0 w-0 shrink-0 transition-all duration-150 group-hover:h-4 group-hover:w-4"
              />
            </button>
          </li>
          <li>
            <ResetEnvironment />
          </li>
        </ul>
      </nav>
    </div>
  )
}
