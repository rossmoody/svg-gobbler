import { LoaderFunctionArgs } from 'react-router-dom'
import { StorageUtils } from '../../utils/storage-utils'

export async function detailLoader({ params }: LoaderFunctionArgs) {
  return StorageUtils.decompressFromBase64(params.originalString ?? '')
}
