import { useEffect } from 'react'
import { Svg } from 'scripts/svg-factory/svg'
import { useMain } from 'src/providers'

type Props = {
  data: Svg[]
}

export const Collection = ({ data }: Props) => {
  const { state, dispatch } = useMain()

  useEffect(() => {
    dispatch({ type: 'set-data', payload: data })
  }, [data, dispatch])

  return (
    <ul className="list-disc break-all">
      {state.data.map((svg, i) => (
        <li key={svg.originalString + i}>{svg.originalString}</li>
      ))}
    </ul>
  )
}
