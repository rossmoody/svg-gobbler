import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { useDashboard } from 'src/providers'
import { Collection as TCollection } from 'src/types'

import { useRemoveCollection } from '../../../hooks/use-remove-collection'
import { CollectionItemIcon } from './collection-item-icon'

type CollectionProperties = {
  collection: TCollection
}

export const Collection = ({ collection }: CollectionProperties) => {
  const { dispatch: sidebarDispatch } = useDashboard()
  const handleRemoveCollection = useRemoveCollection()

  function onClose() {
    sidebarDispatch({ payload: false, type: 'set-open' })
  }

  return (
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
  )
}
