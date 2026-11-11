import { useRevalidator } from 'react-router-dom'
import { useCollection } from 'src/providers'
import { StorageSvg } from 'src/scripts'
import { StorageUtilities } from 'src/utilities/storage-utilities'
import { SvgUtilities } from 'src/utilities/svg-utilities'

export const useMainActions = () => {
  const { revalidate } = useRevalidator()
  const { dispatch, state: collectionState } = useCollection()

  const { collectionId } = collectionState
  const selectedItems = collectionState.selected
  const selectedIds = new Set(selectedItems.map((item) => item.id))
  const selectedItemsStorageSvgs: StorageSvg[] = SvgUtilities.createStorageSvgs(selectedItems)

  const removeSelected = () =>
    StorageUtilities.updatePageData(
      collectionId,
      (current) => ({
        ...current,
        data: current.data.filter((item) => !selectedIds.has(item.id)),
      }),
      collectionState.data,
    )

  const addSelectedTo = (targetCollectionId: string) =>
    StorageUtilities.updatePageData(
      targetCollectionId,
      (current) => ({ ...current, data: [...selectedItemsStorageSvgs, ...current.data] }),
      targetCollectionId === collectionId ? collectionState.data : undefined,
    )

  function resetCollection() {
    dispatch({ type: 'unselect-all' })
    dispatch({ type: 'process-data' })
    revalidate()
  }

  const deleteSelectedItems = async () => {
    await removeSelected()
    resetCollection()
  }

  const moveSelectedItems = async (targetCollectionId: string) => {
    // Only take the items out of this collection once they are safely in the
    // other one; a failed write must not leave them in neither.
    const added = await addSelectedTo(targetCollectionId)
    if (added) await removeSelected()
    resetCollection()
  }

  const duplicateItems = async (targetCollectionId: string) => {
    await addSelectedTo(targetCollectionId)
    resetCollection()
  }

  return { deleteSelectedItems, duplicateItems, moveSelectedItems }
}
