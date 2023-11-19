import { LoaderFunctionArgs } from 'react-router-dom'

export async function detailLoader({ params }: LoaderFunctionArgs) {
  return {
    originalString: decodeURIComponent(params.originalString ?? ''),
    collectionId: params.collectionId ?? '',
  }
}
