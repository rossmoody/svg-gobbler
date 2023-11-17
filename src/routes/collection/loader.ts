import _ from 'lodash'
import { LoaderFunctionArgs, defer } from 'react-router-dom'
import svgFactory from 'scripts/svg-factory'
import { defaultSvgoPlugins } from 'src/data/svgo-plugins'
import { initCollectionState } from 'src/providers'
import { StorageUtils } from 'src/utils/storage-utils'

export async function collectionLoader({ params }: LoaderFunctionArgs) {
  const pageData = await StorageUtils.getPageData(params.id as string)
  let plugins = await StorageUtils.getStorageData('plugins')
  let { view } = await chrome.storage.local.get('view')

  // Initialize context states if not exist in DB using lodash
  view = _.assign({}, initCollectionState.view, view)
  plugins = _.assign([], defaultSvgoPlugins, plugins)

  return defer({
    plugins,
    view,
    collectionId: params.id,
    data: svgFactory.process(pageData), // Returns [] if no data
  })
}
