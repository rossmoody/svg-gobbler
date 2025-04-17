import type { Collection } from 'src/types'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { useDashboard, useUser } from 'src/providers'

import { CollectionItemIcon } from './collection-item-icon'
import { useRemoveCollection } from './use-remove-collection'

export type CollectionItemProperties = {
  /**
   * The collection from which to render the item
   */
  collection: Collection
}

export const CollectionItem = ({ collection }: CollectionItemProperties) => {
  const { dispatch: sidebarDispatch } = useDashboard()
  const { state: userState } = useUser()
  const handleRemoveCollection = useRemoveCollection()

  const { attributes, listeners, setActivatorNodeRef, setNodeRef, transform, transition } =
    useSortable({
      id: collection.id,
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  function onClose() {
    sidebarDispatch({ payload: false, type: 'set-open' })
  }

  return (
    <li ref={setNodeRef} style={style} {...attributes} className="group">
      <div className="flex items-center">
        {!userState.settings.sortCollections && (
          <div
            {...listeners}
            className="w-0 opacity-0 transition-all duration-300 group-hover:w-3 group-hover:opacity-100"
            ref={setActivatorNodeRef}
          >
            <ChevronUpDownIcon className="h-3" />
          </div>
        )}
        <NavLink
          className={({ isActive }) => {
            return clsx(isActive && 'bg-gray-100 dark:bg-gray-700', 'collection-item group')
          }}
          onClick={onClose}
          to={`collection/${collection.id}`}
        >
          <CollectionItemIcon collection={collection} />
          <span className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
            {collection.name}
          </span>
          <button
            className="z-10 flex h-5 w-5 items-center justify-center rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-gray-200 dark:hover:bg-gray-900"
            onClick={(event) => {
              event.preventDefault()
              handleRemoveCollection(collection)
            }}
          >
            <XMarkIcon className="h-4" />
          </button>
        </NavLink>
      </div>
    </li>
  )
}
