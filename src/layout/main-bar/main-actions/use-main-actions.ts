import { useRevalidator } from 'react-router-dom'
import { useCollection } from 'src/providers'
import { StorageUtils } from 'src/utils/storage-utils'

export const useMainActions = () => {
  const { revalidate } = useRevalidator()
  const { state: collectionState } = useCollection()

  const { collectionId } = collectionState
  const selectedItems = collectionState.selected
  const nonSelectedItems = collectionState.data.filter((item) => !selectedItems.includes(item))
  const nonSelectedItemsStrings = nonSelectedItems.map((item) => item.originalString)
  const selectedItemsStrings = selectedItems.map((item) => item.originalString)

  const deleteSelectedItems = async () => {
    const currentPageData = await StorageUtils.getPageData(collectionId)

    await StorageUtils.setPageData(collectionId, {
      ...currentPageData,
      data: nonSelectedItemsStrings,
    })

    revalidate()
  }

  const moveSelectedItems = async (targetCollectionId: string) => {
    const targetPageData = await StorageUtils.getPageData(targetCollectionId)
    const currentPageData = await StorageUtils.getPageData(collectionId)

    await StorageUtils.setPageData(targetCollectionId, {
      ...targetPageData,
      data: [...selectedItemsStrings, ...targetPageData.data],
    })

    await StorageUtils.setPageData(collectionId, {
      ...currentPageData,
      data: nonSelectedItemsStrings,
    })

    revalidate()
  }

  const copySelectedItems = async (targetCollectionId: string) => {
    const targetPageData = await StorageUtils.getPageData(targetCollectionId)

    await StorageUtils.setPageData(targetCollectionId, {
      ...targetPageData,
      data: [...selectedItemsStrings, ...targetPageData.data],
    })
  }

  return { deleteSelectedItems, moveSelectedItems, copySelectedItems }
}
