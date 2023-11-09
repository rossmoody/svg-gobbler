import { LoaderFunctionArgs } from 'react-router-dom'

export async function detailLoader({ params }: LoaderFunctionArgs) {
  return params.originalString ?? ''
}
