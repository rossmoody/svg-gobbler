import { useRevalidator } from 'react-router-dom'
import { useCollection } from 'src/providers'
import { Inline, StorageSvg } from 'src/scripts'
import { type FileSvg } from 'src/types'
import { StorageUtils } from 'src/utils/storage-utils'
import { SvgUtils } from 'src/utils/svg-utils'

/**
 * Upload a given array of svg strings to chrome storage, update the collection
 * context and reset the route to reflect the new data for the current collection.
 */
export const useUpload = () => {
  const { dispatch, state } = useCollection()
  const { revalidate } = useRevalidator()

  return async function (fileSvgs: FileSvg[]) {
    const { collectionId } = state

    // Get current page data for storage
    let pageData = await StorageUtils.getPageData(collectionId)
    const newData: StorageSvg[] = fileSvgs.map(SvgUtils.createStorageSvg)

    // Append new strings to collection's page data
    pageData = {
      ...pageData,
      data: [...newData, ...pageData.data],
    }

    // Update the collection's page data
    await StorageUtils.setPageData(collectionId, pageData)

    // Update the collection context state
    const newSvgClasses = newData.map((item) => new Inline(item))
    dispatch({ payload: [...state.data, ...newSvgClasses], type: 'set-data' })
    dispatch({ type: 'process-data' })
    revalidate()
  }
}
