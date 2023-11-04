import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useSidebar } from 'src/providers'
import type { Collection } from 'types'
import { useRemoveCollection } from './hooks/use-remove-collection'

type Props = {
  /**
   * The collection from which to render the item
   */
  collection: Collection
}

export const CollectionItem = ({ collection }: Props) => {
  const { dispatch } = useSidebar()
  const handleRemoveCollection = useRemoveCollection()

  const faviconUrl = useMemo(() => {
    if (!collection.origin) return ''
    return `https://s2.googleusercontent.com/s2/favicons?domain=${collection.origin}`
  }, [collection.origin])

  return (
    <NavLink
      to={`collection/${collection.id}`}
      onClick={() => dispatch({ type: 'set-open', payload: false })}
      className={({ isActive }) => {
        return clsx(
          isActive ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-800',
          'group flex items-center gap-x-2 text-gray-800 dark:text-gray-200 rounded-md px-2 py-1 text-sm leading-6 font-normal justify-between transition-all duration-300',
        )
      }}
    >
      <img src={faviconUrl} className="h-4 w-4 flex-shrink-0 rounded-sm" alt="Favicon" />
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
