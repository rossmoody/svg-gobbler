import { LoaderFunctionArgs, defer } from 'react-router-dom'
import { SvgoPlugin } from 'src/constants/svgo-plugins'
import { CollectionState, UserState } from 'src/providers'
import { svgFactory } from 'src/scripts'
import { logger } from 'src/utils/logger'
import { StorageUtils } from 'src/utils/storage-utils'

export async function collectionLoader({ params }: LoaderFunctionArgs) {
  const id = params.id as string
  const pageData = await StorageUtils.getPageData(id)
  const plugins = await StorageUtils.getStorageData<SvgoPlugin[]>('plugins')
  const view = await StorageUtils.getStorageData<CollectionState['view']>('view')
  const user = await StorageUtils.getStorageData<UserState>('user')

  logger.info('Collection Loader', { id, pageData, plugins, user, view })

  return defer({
    collectionId: params.id,
    data: svgFactory.process(pageData), // Returns [] if no data
    plugins,
    user,
    view,
  })
}
