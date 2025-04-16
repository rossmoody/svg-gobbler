import { useRevalidator } from 'react-router-dom'
import { useCollection } from 'src/providers'
import { StorageSvg } from 'src/scripts'
import { StorageUtils } from 'src/utils/storage-utils'
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
    const currentPageData = await StorageUtils.getPageData(collectionId)

    await StorageUtils.setPageData(collectionId, {
      ...currentPageData,
      data: nonSelectedItemStorageSvgs,
    })

    resetCollection()
  }

  const moveSelectedItems = async (targetCollectionId: string) => {
    const targetPageData = await StorageUtils.getPageData(targetCollectionId)
    const currentPageData = await StorageUtils.getPageData(collectionId)

    await StorageUtils.setPageData(targetCollectionId, {
      ...targetPageData,
      data: [...selectedItemsStorageSvgs, ...targetPageData.data],
    })

    await StorageUtils.setPageData(collectionId, {
      ...currentPageData,
      data: nonSelectedItemStorageSvgs,
    })

    resetCollection()
  }

  const copySelectedItems = async (targetCollectionId: string) => {
    const targetPageData = await StorageUtils.getPageData(targetCollectionId)

    await StorageUtils.setPageData(targetCollectionId, {
      ...targetPageData,
      data: [...selectedItemsStorageSvgs, ...targetPageData.data],
    })

    resetCollection()
  }

  return { copySelectedItems, deleteSelectedItems, moveSelectedItems }
}
