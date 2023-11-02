import { LoaderFunctionArgs, defer } from 'react-router-dom'
import svgFactory from 'scripts/svg-factory/svg-factory'
import { PageData } from 'types'

type CollectionParams = {
  id: string
}

export async function loader({ params }: LoaderFunctionArgs<CollectionParams>) {
  const [pageData] = Object.values(await chrome.storage.local.get(params.id)) as [PageData]

  return defer({
    data: svgFactory.process(pageData),
  })
}
