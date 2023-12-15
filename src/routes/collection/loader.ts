import _ from 'lodash'
import { LoaderFunctionArgs, defer } from 'react-router-dom'
import { SvgoPlugin, defaultSvgoPlugins } from 'src/constants/svgo-plugins'
import { CollectionState, UserState, initCollectionState, initUserState } from 'src/providers'
import { StorageUtils } from 'src/utils/storage-utils'
import { svgFactory } from 'svg-gobbler-scripts'

export async function collectionLoader({ params }: LoaderFunctionArgs) {
  const pageData = await StorageUtils.getPageData(params.id as string)
  let plugins = await StorageUtils.getStorageData<SvgoPlugin[]>('plugins')
  let view = await StorageUtils.getStorageData<CollectionState['view']>('view')
  let user = await StorageUtils.getStorageData<UserState>('user')

  // Initialize context states if not exist in DB using lodash
  view = _.assign({}, initCollectionState.view, view)
  plugins = _.assign([], defaultSvgoPlugins, plugins)
  user = _.assign({}, initUserState, user)

  return defer({
    collectionId: params.id,
    data: svgFactory.process(pageData), // Returns [] if no data
    plugins,
    user,
    view,
  })
}
