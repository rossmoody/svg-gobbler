import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { useDashboard } from 'src/providers'

import { type CollectionItemProperties } from './collection-item'
import { CollectionItemIcon } from './collection-item-icon'
import { CollectionRemoveItem } from './collection-remove-item'

export const Collection = ({ collection }: CollectionItemProperties) => {
  const { dispatch: sidebarDispatch } = useDashboard()

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
      <CollectionRemoveItem collection={collection} />
    </NavLink>
  )
}
