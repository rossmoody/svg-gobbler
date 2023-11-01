import { LoaderFunctionArgs, defer } from 'react-router-dom'

export async function loader({ params }: LoaderFunctionArgs) {
  console.log(params)

  return defer({
    collection: new Promise((resolve) => setTimeout(() => resolve([]), 4000)),
  })
}
