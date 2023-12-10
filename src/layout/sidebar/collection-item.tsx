import type { Collection } from 'src/types'

import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useDashboard } from 'src/providers'

import { useRemoveCollection } from './use-remove-collection'

type Props = {
  /**
   * The collection from which to render the item
   */
  collection: Collection
}

export const CollectionItem = ({ collection }: Props) => {
  const { dispatch: sidebarDispatch } = useDashboard()
  const handleRemoveCollection = useRemoveCollection()

  const faviconUrl = useMemo(() => {
    if (!collection.origin) return ''
    return `https://s2.googleusercontent.com/s2/favicons?domain=${collection.origin}`
  }, [collection.origin])

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
      {faviconUrl ? (
        <img alt="Favicon" className="h-4 w-4 flex-shrink-0 rounded-sm" src={faviconUrl} />
      ) : (
        <div className="h-4 w-4 flex-shrink-0 rounded-md bg-gray-300" />
      )}
      <span className="flex-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
        {collection.name}
      </span>
      <button
        className="z-10 flex h-5 w-5 items-center justify-center rounded-md opacity-0 transition-opacity duration-300 hover:bg-gray-200 group-hover:opacity-100 dark:hover:bg-gray-900"
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
