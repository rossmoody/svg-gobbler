import { useRevalidator } from 'react-router-dom'
import { Inline } from 'scripts/svg-classes/inline'
import { useCollection } from 'src/providers'
import { PageData } from 'src/types'
import lzString from 'src/utils/lz-string'

/**
 * Upload a given array of svg strings to chrome storage, update
 * collection context and reset the route to reflect the new data.
 */
export const useUpload = () => {
  const { state, dispatch } = useCollection()
  const { revalidate } = useRevalidator()

  return async function (data: string[]) {
    const { collectionId } = state

    // Get current page data for storage
    const compressedPageData = await chrome.storage.local.get(collectionId)
    let pageData = lzString.decompressFromBase64<PageData>(compressedPageData[collectionId])

    // Append new strings to collection's page data
    pageData = {
      ...pageData,
      data: [...data, ...pageData.data],
    }

    // Update the collection's page data
    await chrome.storage.local.set({
      [collectionId]: lzString.compressToBase64(pageData),
    })

    // Update the collection context state
    const newSvgClasses = data.map((svg) => new Inline(svg, ''))
    dispatch({ type: 'set-data', payload: [...state.data, ...newSvgClasses] })
    dispatch({ type: 'process-data' })
    revalidate()
  }
}
