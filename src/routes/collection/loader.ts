import { LoaderFunctionArgs, defer } from 'react-router-dom'
import svgFactory from 'scripts/svg-factory/svg-factory'
import { PageData } from 'types'

type CollectionParams = {
  id: string
}

export async function loader({ params }: LoaderFunctionArgs<CollectionParams>) {
  const [pageData] = Object.values(await chrome.storage.local.get(params.id)) as [PageData]

  // We can always depend on an array from svgFactory, even if it's empty or if it fails
  return defer({
    data: svgFactory.process(pageData),
  })
}
