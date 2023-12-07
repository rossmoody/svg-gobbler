import { nanoid } from 'nanoid'
import { useRevalidator } from 'react-router-dom'
import { useCollection } from 'src/providers'
import { StorageSvg } from 'src/types'
import { StorageUtils } from 'src/utils/storage-utils'
import { Inline } from 'svg-gobbler-scripts'

/**
 * Upload a given array of svg strings to chrome storage, update the
 * collection context and reset the route to reflect the new data for the current
 * collection. This function is used by the upload button in the collection
 * header.
 */
export const useUpload = () => {
  const { state, dispatch } = useCollection()
  const { revalidate } = useRevalidator()

  return async function (data: string[]) {
    const { collectionId } = state

    // Get current page data for storage
    let pageData = await StorageUtils.getPageData(collectionId)
    const newData: StorageSvg[] = data.map((svg) => ({
      id: nanoid(),
      svg,
    }))

    // Append new strings to collection's page data
    pageData = {
      ...pageData,
      data: [...newData, ...pageData.data],
    }

    // Update the collection's page data
    await StorageUtils.setPageData(collectionId, pageData)

    // Update the collection context state
    const newSvgClasses = newData.map((item) => new Inline(item.svg, item.id))
    dispatch({ type: 'set-data', payload: [...state.data, ...newSvgClasses] })
    dispatch({ type: 'process-data' })
    revalidate()
  }
}
