import type { Collection as TCollection } from 'src/types'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { PropsWithChildren } from 'react'
import { useUser } from 'src/providers'

export type CollectionItemProperties = {
  /**
   * The collection from which to render the item
   */
  collection: TCollection
}

export const CollectionItem = ({
  children,
  collection,
}: PropsWithChildren<CollectionItemProperties>) => {
  const { state: userState } = useUser()

  const { attributes, listeners, setActivatorNodeRef, setNodeRef, transform, transition } =
    useSortable({
      id: collection.id,
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
        {children}
      </div>
    </li>
  )
}
