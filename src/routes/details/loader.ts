import { LoaderFunctionArgs } from 'react-router-dom'
import { UserState } from 'src/providers'
import { StorageSvg } from 'src/scripts'
import { DetailsParameters } from 'src/types'
import { StorageUtils } from 'src/utils/storage-utils'

/**
 * The primary initialization function for the details route. Gets the svg and id from storage
 * from the collection it belongs to and returns it to the client context.
 */
export async function detailLoader({ params }: LoaderFunctionArgs): Promise<DetailsParameters> {
  const collectionId = params.collectionId as string
  const pageData = await StorageUtils.getPageData(collectionId)

  if (!pageData.data) {
    throw new Error(`No data found for collection ${collectionId}`)
  }

  const svg = pageData.data.find((item) => item.id === params.id) as StorageSvg

  if (!svg) {
    throw new Error(`No SVG found with ID ${params.id} in collection ${collectionId}`)
  }

  const user = (await StorageUtils.getStorageData<UserState>('user')) as UserState

  return {
    collectionId,
    svg,
    user,
  }
}
