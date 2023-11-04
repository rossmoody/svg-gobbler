import { useEffect } from 'react'
import { PresentationSvg } from 'scripts/svg-factory/presentation-svg'
import { useMain } from 'src/providers'
import type { CollectionData } from 'types'
import { Card } from './card'

export const Collection = ({ data, collectionId }: CollectionData) => {
  const { state, dispatch } = useMain()

  useEffect(() => {
    dispatch({ type: 'set-data', payload: data })
    dispatch({ type: 'set-collection-id', payload: collectionId })
  }, [data, collectionId, dispatch])

  return (
    <section className="transition-colors border-gray-200 dark:border-gray-800">
      <ul className="grid grid-cols-4 gap-4">
        {state.data.map((svg, i) => (
          <Card key={svg.originalString + i} data={new PresentationSvg(svg)} />
        ))}
      </ul>
    </section>
  )
}
