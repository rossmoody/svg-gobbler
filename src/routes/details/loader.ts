import { LoaderFunctionArgs } from 'react-router-dom'
import { UserState } from 'src/providers'
import { DetailsParams } from 'src/types'
import { StorageUtils } from 'src/utils/storage-utils'
import { StorageSvg } from 'svg-gobbler-scripts'

/**
 * The primary initialization function for the details route. Gets the svg and id from storage
 * from the collection it belongs to and returns it to the client context.
 */
export async function detailLoader({ params }: LoaderFunctionArgs): Promise<DetailsParams> {
  const collectionId = params.collectionId as string
  const pageData = await StorageUtils.getPageData(collectionId)
  const svg = pageData.data.find((item) => item.id === params.id) as StorageSvg
  const user = (await StorageUtils.getStorageData<UserState>('user')) as UserState // Initialized in root loader

  return {
    collectionId,
    svg,
    user,
  }
}
