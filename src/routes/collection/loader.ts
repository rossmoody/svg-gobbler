import _ from 'lodash'
import { LoaderFunctionArgs, defer } from 'react-router-dom'
import { SvgoPlugin, defaultSvgoPlugins } from 'src/constants/svgo-plugins'
import { CollectionState, UserState, initCollectionState, initUserState } from 'src/providers'
import { logger } from 'src/utils/logger'
import { StorageUtils } from 'src/utils/storage-utils'
import { svgFactory } from 'svg-gobbler-scripts'

export async function collectionLoader({ params }: LoaderFunctionArgs) {
  const id = params.id as string
  const pageData = await StorageUtils.getPageData(id)
  let plugins = await StorageUtils.getStorageData<SvgoPlugin[]>('plugins')
  let view = await StorageUtils.getStorageData<CollectionState['view']>('view')
  let user = await StorageUtils.getStorageData<UserState>('user')

  // Initialize context states if not exist in DB using lodash
  view = _.assign({}, initCollectionState.view, view)
  plugins = _.assign([], defaultSvgoPlugins, plugins)
  user = _.assign({}, initUserState, user)

  logger.info('Collection Loader', { id, pageData, plugins, user, view })

  return defer({
    collectionId: params.id,
    data: svgFactory.process(pageData), // Returns [] if no data
    plugins,
    user,
    view,
  })
}
