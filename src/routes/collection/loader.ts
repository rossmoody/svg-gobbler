import { LoaderFunctionArgs, defer } from 'react-router-dom'
import svgFactory from 'scripts/svg-factory/svg-factory'
import lzString from 'src/utils/lz-string'
import { PageData } from 'types'

type CollectionParams = {
  id: string
}

export async function collectionLoader({ params }: LoaderFunctionArgs<CollectionParams>) {
  const [compressed] = Object.values(await chrome.storage.local.get(params.id)) as [string]
  const pageData = lzString.decompressFromBase64<PageData>(compressed)

  // We can always depend on an array from svgFactory, even if it's empty or if it fails
  return defer({
    data: svgFactory.process(pageData),
  })
}
