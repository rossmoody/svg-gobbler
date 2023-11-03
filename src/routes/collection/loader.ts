import { LoaderFunctionArgs, defer } from 'react-router-dom'
import svgFactory from 'scripts/svg-factory/svg-factory'
import lzString from 'src/utils/lz-string'
import { Collection, PageData } from 'types'

type CollectionParams = {
  id: Collection['id']
}

export async function collectionLoader({ params }: LoaderFunctionArgs<CollectionParams>) {
  const [compressed] = Object.values(await chrome.storage.local.get(params.id)) as [string]
  const pageData = lzString.decompressFromBase64<PageData>(compressed)

  return defer({
    collectionId: params.id,
    data: svgFactory.process(pageData),
  })
}
