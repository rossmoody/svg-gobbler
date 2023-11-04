import { useEffect } from 'react'
import { useMain } from 'src/providers'
import type { CollectionData } from 'types'

export const Collection = ({ data, collectionId }: CollectionData) => {
  const { state, dispatch } = useMain()

  useEffect(() => {
    dispatch({ type: 'set-data', payload: data })
    dispatch({ type: 'set-collection-id', payload: collectionId })
  }, [data, collectionId, dispatch])

  return (
    <section className="transition-colors border-gray-200 dark:border-gray-800">
      <ul className="list-disc break-all">
        {state.data.map((svg, i) => (
          <li key={svg.originalString + i}>{svg.originalString}</li>
        ))}
      </ul>
    </section>
  )
}
