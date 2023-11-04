import { Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
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
          <Transition
            show
            appear
            as={Fragment}
            key={svg.originalString + i}
            enter="transition-all duration-300 ease-in-out"
            enterFrom="opacity-0 translate-y-2 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition-all duration-300 ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Card data={new PresentationSvg(svg)} style={{ transitionDelay: `${i * 15}ms` }} />
          </Transition>
        ))}
      </ul>
    </section>
  )
}
