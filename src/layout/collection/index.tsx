import { Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
import { PresentationSvg } from 'scripts/svg-factory/presentation-svg'
import { useCollection } from 'src/providers'
import type { CollectionData } from 'types'
import { Card } from './card'

export const Collection = ({ data, collectionId }: CollectionData) => {
  const { state, dispatch } = useCollection()

  useEffect(() => {
    dispatch({ type: 'set-data', payload: data })
    dispatch({ type: 'set-collection-id', payload: collectionId })
  }, [data, collectionId, dispatch])

  return (
    <section className="transition-colors border-gray-200 dark:border-gray-800">
      <ul className="flex flex-wrap gap-3">
        {state.data.map((svg, i) => (
          <Transition
            show
            appear
            as={Fragment}
            key={svg.originalString + i}
            enter="transition-all duration-300 ease-in-out"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
          >
            <Card data={new PresentationSvg(svg)} style={{ transitionDelay: `${i * 8}ms` }} />
          </Transition>
        ))}
      </ul>
    </section>
  )
}
