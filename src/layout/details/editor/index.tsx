import { useCallback } from 'react'
import { useDetails } from 'src/providers'

export const DetailsEditor = () => {
  const { state, dispatch } = useDetails()

  const onChange = useCallback(
    (val: string) => {
      dispatch({ type: 'update-current-string', payload: val })
    },
    [dispatch],
  )

  return <section>Editor</section>
}
