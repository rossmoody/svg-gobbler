import {
  BuildingLibraryIcon,
  Cog6ToothIcon,
  MegaphoneIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import { Logo } from 'src/components'
import { useSidebar } from 'src/providers'
import { CollectionItem } from './collection-item'

export const SidebarContent = () => {
  const { state } = useSidebar()

  return (
    <div className="flex grow flex-col gap-y-4 overflow-y-auto border-r px-6 pb-5 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex h-16 shrink-0 items-center mt-2">
        <Logo className="h-8 w-auto" />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-1.5">
          <li>
            <NavLink to="/details/1" className="collection-item">
              <BuildingLibraryIcon className="h-4 w-4 shrink-0 " aria-hidden="true" />
              All
            </NavLink>
          </li>
          <li>
            <NavLink to="/details/1" className="collection-item">
              <PlusIcon className="h-4 w-4 shrink-0 " aria-hidden="true" />
              New collection
            </NavLink>
          </li>
          <hr className="border-gray-200 dark:border-gray-800 my-4" />
          <li>
            <ul role="list" className="-mx-2 space-y-1.5">
              {state.collections.map((collection) => (
                <li key={collection.id}>
                  <CollectionItem collection={collection} />
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <NavLink to="/details/1" className="collection-item">
              <Cog6ToothIcon className="h-4 w-4 shrink-0 " aria-hidden="true" />
              Settings
            </NavLink>
          </li>
          <li>
            <a href="#" className="collection-item">
              <MegaphoneIcon className="h-4 w-4 shrink-0 " aria-hidden="true" />
              Leave a review
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
