import _ from 'lodash'
import { LoaderFunctionArgs, defer } from 'react-router-dom'
import svgFactory from 'scripts/svg-factory'
import { initCollectionState } from 'src/providers/collection/reducer'
import type { Collection, PageData } from 'src/types'
import lzString from 'src/utils/lz-string'
import { svgFactoryChecker } from 'src/utils/svg-factory-checker'

type CollectionParams = {
  id: Collection['id']
}

export async function collectionLoader({ params }: LoaderFunctionArgs<CollectionParams>) {
  const [compressed] = Object.values(await chrome.storage.local.get(params.id)) as [string]
  const pageData = lzString.decompressFromBase64<PageData>(compressed)
  let { view } = await chrome.storage.local.get('view')

  // Initialize context states if not exist in DB using lodash
  view = _.assign({}, initCollectionState.view, view)

  // Dev logger to look for malformed svgs
  svgFactoryChecker(pageData)

  return defer({
    view,
    collectionId: params.id,
    data: svgFactory.process(pageData), // Returns [] if no data
  })
}
