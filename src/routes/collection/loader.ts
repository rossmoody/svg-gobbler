import { LoaderFunctionArgs, defer } from 'react-router-dom'
import svgFactory from 'scripts/svg-factory/svg-factory'
import lzString from 'src/utils/lz-string'
import { svgFactoryChecker } from 'src/utils/svg-factory-checker'
import { Collection, PageData } from 'types'

type CollectionParams = {
  id: Collection['id']
}

export async function collectionLoader({ params }: LoaderFunctionArgs<CollectionParams>) {
  const [compressed] = Object.values(await chrome.storage.local.get(params.id)) as [string]
  const pageData = lzString.decompressFromBase64<PageData>(compressed)
  svgFactoryChecker(pageData) // Look for malformed svgs

  return defer({
    collectionId: params.id,
    // data: new Promise((resolve) => setTimeout(() => resolve(svgFactory.process(pageData)), 1000)),
    data: svgFactory.process(pageData),
  })
}
