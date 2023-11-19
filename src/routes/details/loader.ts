import { LoaderFunctionArgs } from 'react-router-dom'

export async function detailLoader({ params }: LoaderFunctionArgs) {
  return {
    originalString: atob(params.originalString ?? ''),
    collectionId: params.collectionId ?? '',
  }
}
