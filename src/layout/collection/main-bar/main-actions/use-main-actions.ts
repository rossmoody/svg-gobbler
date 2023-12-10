import { useRevalidator } from 'react-router-dom'
import { useCollection } from 'src/providers'
import { StorageSvg } from 'src/types'
import { StorageUtils } from 'src/utils/storage-utils'
import { SvgUtils } from 'src/utils/svg-utils'

export const useMainActions = () => {
  const { revalidate } = useRevalidator()
  const { state: collectionState } = useCollection()

  const { collectionId } = collectionState
  const selectedItems = collectionState.selected
  const nonSelectedItems = collectionState.data.filter((item) => !selectedItems.includes(item))
  const nonSelectedItemStorageSvgs: StorageSvg[] = SvgUtils.createStorageSvgs(nonSelectedItems)
  const selectedItemsStorageSvgs: StorageSvg[] = SvgUtils.createStorageSvgs(selectedItems)

  const deleteSelectedItems = async () => {
    const currentPageData = await StorageUtils.getPageData(collectionId)

    await StorageUtils.setPageData(collectionId, {
      ...currentPageData,
      data: nonSelectedItemStorageSvgs,
    })

    revalidate()
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

    revalidate()
  }

  const copySelectedItems = async (targetCollectionId: string) => {
    const targetPageData = await StorageUtils.getPageData(targetCollectionId)

    await StorageUtils.setPageData(targetCollectionId, {
      ...targetPageData,
      data: [...selectedItemsStorageSvgs, ...targetPageData.data],
    })
  }

  return { copySelectedItems, deleteSelectedItems, moveSelectedItems }
}
