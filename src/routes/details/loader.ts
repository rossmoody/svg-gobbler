import { LoaderFunctionArgs } from 'react-router-dom'
import { StorageSvg } from 'src/types'
import { StorageUtils } from 'src/utils/storage-utils'

export async function detailLoader({ params }: LoaderFunctionArgs) {
  const pageData = await StorageUtils.getPageData(params.collectionId as string)
  const svg: StorageSvg = pageData.data.find((item) => item.id === params.id) ?? { svg: '', id: '' }

  console.log({ svg, pageData, params })
  return {
    id: svg.id,
    originalString: svg.svg,
    collectionId: params.collectionId ?? '',
  }
}
