import { LoaderFunctionArgs } from 'react-router-dom'
import { type UserState, initUserState } from 'src/providers'
import { DetailsParams, StorageSvg } from 'src/types'
import { StorageUtils } from 'src/utils/storage-utils'

/**
 * The primary initialization function for the details route. Gets the svg and id from storage
 * from the collection it belongs to and returns it to the client context.
 */
export async function detailLoader({ params }: LoaderFunctionArgs): Promise<DetailsParams> {
  const collectionId = params.collectionId as string
  const pageData = await StorageUtils.getPageData(collectionId)
  const storageSvg = pageData.data.find((item) => item.id === params.id) as StorageSvg
  const user = (await StorageUtils.getStorageData<UserState>('user')) ?? initUserState

  return {
    collectionId,
    id: storageSvg.id,
    originalString: storageSvg.svg,
    user,
  }
}
