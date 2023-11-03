import { useEffect } from 'react'
import { useMain } from 'src/providers'
import { CollectionData } from 'types'

export const Collection = ({ data, collectionId }: CollectionData) => {
  const { state, dispatch } = useMain()

  useEffect(() => {
    dispatch({ type: 'set-data', payload: data })
    dispatch({ type: 'set-collection-id', payload: collectionId })
  }, [data, collectionId, dispatch])

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 overflow-y-auto h-[calc(100dvh-theme(space.28))] transition-colors bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50 border-gray-200 dark:border-gray-800">
      <ul className="list-disc break-all">
        {state.data.map((svg, i) => (
          <li key={svg.originalString + i}>{svg.originalString}</li>
        ))}
      </ul>
    </section>
  )
}
