import { closestCenter, DndContext, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useCallback } from 'react'
import { useDashboard } from 'src/providers'
import { StorageUtilities } from 'src/utilities/storage-utilities'

import { Collection } from './collection'
import { CollectionItem } from './collection-item'

export const SidebarMain = () => {
  const { dispatch, state } = useDashboard()

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (!over || active.id === over.id) return

      const oldIndex = state.collections.findIndex((collection) => collection.id === active.id)
      const newIndex = state.collections.findIndex((collection) => collection.id === over.id)

      const newCollections = arrayMove(state.collections, oldIndex, newIndex)
      dispatch({ payload: newCollections, type: 'set-collections' })
      StorageUtilities.setStorageData('collections', newCollections)
    },
    [dispatch, state.collections],
  )

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <ul className="flex flex-col gap-1.5" role="list">
        <SortableContext
          items={state.collections.map(({ id }) => id)}
          strategy={verticalListSortingStrategy}
        >
          {state.collections.map((collection) => (
            <CollectionItem collection={collection} key={collection.id}>
              <Collection collection={collection} />
            </CollectionItem>
          ))}
        </SortableContext>
      </ul>
    </DndContext>
  )
}
