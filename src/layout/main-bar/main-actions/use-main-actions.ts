import { useCollection } from 'src/providers'
import { PageData } from 'src/types'
import { StorageUtils } from 'src/utils/storage-utils'

export const useMainActions = () => {
  const { state: collectionState, dispatch: collectionDispatch } = useCollection()
  // const { state: dashboardState } = useDashboard()

  const deleteSelected = async () => {
    const selectedItems = collectionState.selected
    const filteredItems = collectionState.data.filter((item) => !selectedItems.includes(item))
    const filteredItemString = filteredItems.map((item) => item.originalString)

    // Update storage
    const pageData = await StorageUtils.getPageData<PageData>(collectionState.collectionId)
    StorageUtils.setPageData(collectionState.collectionId, {
      ...pageData,
      data: filteredItemString,
    })

    // Update client context
    collectionDispatch({ type: 'set-data', payload: filteredItems })
    collectionDispatch({ type: 'process-data' })
  }

  return { deleteSelected }
}
