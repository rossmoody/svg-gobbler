import { defer, LoaderFunctionArgs } from 'react-router-dom'
import { SvgoPlugin } from 'src/constants/svgo-plugins'
import { CollectionState, UserState } from 'src/providers'
import { svgFactory } from 'src/scripts'
import { logger } from 'src/utils/logger'
import { StorageUtilities } from 'src/utils/storage-utilities'

export async function collectionLoader({ params }: LoaderFunctionArgs) {
  const id = params.id as string
  const pageData = await StorageUtilities.getPageData(id)
  const plugins = await StorageUtilities.getStorageData<SvgoPlugin[]>('plugins')
  const view = await StorageUtilities.getStorageData<CollectionState['view']>('view')
  const user = await StorageUtilities.getStorageData<UserState>('user')

  logger.info('Collection Loader', { id, pageData, plugins, user, view })

  return defer({
    collectionId: params.id,
    data: svgFactory.process(pageData),
    plugins,
    user,
    view,
  })
}
