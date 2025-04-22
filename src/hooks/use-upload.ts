import { useCallback } from 'react'
import { useRevalidator } from 'react-router-dom'
import { useCollection } from 'src/providers'
import { Inline, StorageSvg } from 'src/scripts'
import { type FileSvg } from 'src/types'
import { StorageUtilities } from 'src/utilities/storage-utilities'
import { SvgUtilities } from 'src/utilities/svg-utilities'

/**
 * Upload a given array of svg strings to chrome storage, update the collection
 * context and reset the route to reflect the new data for the current collection.
 */
export const useUpload = () => {
  const { dispatch, state } = useCollection()
  const { revalidate } = useRevalidator()

  return useCallback(
    async function (fileSvgs: FileSvg[]) {
      const { collectionId } = state

      // Get current page data for storage
      let pageData = await StorageUtilities.getPageData(collectionId)
      const newData: StorageSvg[] = fileSvgs.map(SvgUtilities.createStorageSvg)

      // Append new strings to collection's page data
      pageData = {
        ...pageData,
        data: [...newData, ...pageData.data],
      }

      // Update the collection's page data
      await StorageUtilities.setPageData(collectionId, pageData)

      // Update the collection context state
      const newSvgClasses = newData.map((item) => new Inline(item))
      dispatch({ payload: [...state.data, ...newSvgClasses], type: 'set-data' })
      dispatch({ type: 'process-data' })
      revalidate()
    },
    [dispatch, state, revalidate],
  )
}
