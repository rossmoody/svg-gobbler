import { useRevalidator } from 'react-router-dom'
import { useCollection } from 'src/providers'
import { StorageSvg } from 'src/scripts'
import { StorageUtilities } from 'src/utils/storage-utilities'
import { SvgUtilities } from 'src/utils/svg-utilities'

export const useMainActions = () => {
  const { revalidate } = useRevalidator()
  const { dispatch, state: collectionState } = useCollection()

  const { collectionId } = collectionState
  const selectedItems = collectionState.selected
  const nonSelectedItems = collectionState.data.filter((item) => !selectedItems.includes(item))
  const nonSelectedItemStorageSvgs: StorageSvg[] = SvgUtilities.createStorageSvgs(nonSelectedItems)
  const selectedItemsStorageSvgs: StorageSvg[] = SvgUtilities.createStorageSvgs(selectedItems)

  function resetCollection() {
    dispatch({ type: 'unselect-all' })
    revalidate()
  }

  const deleteSelectedItems = async () => {
    const currentPageData = await StorageUtilities.getPageData(collectionId)

    await StorageUtilities.setPageData(collectionId, {
      ...currentPageData,
      data: nonSelectedItemStorageSvgs,
    })

    resetCollection()
  }

  const moveSelectedItems = async (targetCollectionId: string) => {
    const targetPageData = await StorageUtilities.getPageData(targetCollectionId)
    const currentPageData = await StorageUtilities.getPageData(collectionId)

    await StorageUtilities.setPageData(targetCollectionId, {
      ...targetPageData,
      data: [...selectedItemsStorageSvgs, ...targetPageData.data],
    })

    await StorageUtilities.setPageData(collectionId, {
      ...currentPageData,
      data: nonSelectedItemStorageSvgs,
    })

    resetCollection()
  }

  const copySelectedItems = async (targetCollectionId: string) => {
    const targetPageData = await StorageUtilities.getPageData(targetCollectionId)

    await StorageUtilities.setPageData(targetCollectionId, {
      ...targetPageData,
      data: [...selectedItemsStorageSvgs, ...targetPageData.data],
    })

    resetCollection()
  }

  return { copySelectedItems, deleteSelectedItems, moveSelectedItems }
}
