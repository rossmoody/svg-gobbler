import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useDashboard } from 'src/providers'
import type { Collection } from 'src/types'
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

  return (
    <NavLink
      to={`collection/${collection.id}`}
      onClick={() => {
        sidebarDispatch({ type: 'set-open', payload: false })
      }}
      className={({ isActive }) => {
        return clsx(isActive && 'bg-gray-100 dark:bg-gray-700', 'collection-item group')
      }}
    >
      {faviconUrl ? (
        <img src={faviconUrl} className="h-4 w-4 flex-shrink-0 rounded-sm" alt="Favicon" />
      ) : (
        <div className="h-4 w-4 flex-shrink-0 rounded-md bg-gray-300" />
      )}
      <span className="flex-1 whitespace-nowrap overflow-ellipsis overflow-hidden">
        {collection.name}
      </span>
      <button
        className="z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-300 hover:bg-gray-200 dark:hover:bg-gray-900 h-5 w-5 flex items-center justify-center rounded-md"
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
