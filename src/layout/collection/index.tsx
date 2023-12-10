import type { CollectionData } from 'src/types'

import { Transition } from '@headlessui/react'
import { Fragment, useEffect, useMemo } from 'react'
import { Button } from 'src/components'
import { NoResults } from 'src/components/no-results'
import { useCollection } from 'src/providers'

import { Card } from './card'

export const Collection = ({ data }: Pick<CollectionData, 'data'>) => {
  const { dispatch, state } = useCollection()

  /**
   * We do this here instead of routes because data is awaited in
   * Suspense within the route component.
   */
  useEffect(() => {
    dispatch({ payload: data, type: 'set-data' })
    dispatch({ type: 'process-data' })
  }, [data, dispatch])

  const filteredResultLength = useMemo(() => {
    if (state.view.filters['hide-cors']) {
      return state.data.filter((svg) => !svg.corsRestricted).length
    }

    return state.data.length
  }, [state.data, state.view.filters])

  function generateMinSize() {
    switch (state.view.size) {
      case 96:
        return '10rem'
      case 128:
        return '12.5rem'
      case 192:
        return '15rem'
      case 256:
        return '17.5rem'
      default:
        return '8.75rem'
    }
  }

  function calculateDelay(index: number) {
    return index > 199 ? '100ms' : `${index * 8}ms`
  }

  if (state.processedData.length === 0) {
    return <NoResults />
  }

  return (
    <section className="border-gray-200 transition-colors dark:border-gray-800">
      <ul
        className="grid justify-between gap-4"
        style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${generateMinSize()}, 1fr))` }}
      >
        {state.processedData.map((svg, i) => (
          <Transition
            appear
            as={Fragment}
            enter="transition-all duration-300 ease-in-out"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            key={svg.originalString + i}
            show
          >
            <Card data={svg} style={{ transitionDelay: calculateDelay(i) }} />
          </Transition>
        ))}
      </ul>
      <Transition
        className="my-12 flex justify-center"
        enter="transition-opacity duration-300 ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        show={state.processedData.length < filteredResultLength}
      >
        <Button onClick={() => dispatch({ type: 'load-more' })} size="lg" variant="secondary">
          Load more
        </Button>
      </Transition>
    </section>
  )
}
