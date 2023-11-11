import { LoaderFunctionArgs } from 'react-router-dom'

export const settingsLoader = ({ params }: LoaderFunctionArgs) => {
  console.log(params)
  return ''
}
