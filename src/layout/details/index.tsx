import { forwardRef, useEffect } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Button } from 'src/components'
import { useDetails } from 'src/providers/details'

export const DetailsLayout = forwardRef<HTMLDivElement>((_, ref) => {
  const svg = useLoaderData() as string
  const { state, dispatch } = useDetails()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({ type: 'init', payload: svg })
  }, [svg, dispatch])

  return (
    <div ref={ref}>
      {state.originalString}
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  )
})
