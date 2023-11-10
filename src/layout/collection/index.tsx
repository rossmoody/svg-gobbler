import { Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'
import { Button } from 'src/components'
import { NoResults } from 'src/components/no-results'
import { CardSvg } from 'src/layout/collection/card/card-svg'
import { useCollection } from 'src/providers'
import type { CollectionData } from 'src/types'
import { Card } from './card'

export const Collection = ({ data }: Pick<CollectionData, 'data'>) => {
  const { state, dispatch } = useCollection()

  /**
   * We do this here instead of routes because data is awaited in
   * Suspense within the route component.
   */
  useEffect(() => {
    dispatch({ type: 'set-data', payload: data })
    dispatch({ type: 'process-data' })
  }, [data, dispatch])

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
    <section className="transition-colors border-gray-200 dark:border-gray-800">
      <ul
        className="grid gap-4 justify-between"
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${generateMinSize()}, 1fr))`,
        }}
      >
        {state.processedData.map((svg, i) => (
          <Transition
            show
            appear
            as={Fragment}
            key={svg.originalString + i}
            enter="transition-all duration-300 ease-in-out"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
          >
            <Card data={new CardSvg(svg)} style={{ transitionDelay: calculateDelay(i) }} />
          </Transition>
        ))}
      </ul>
      <Transition
        show={state.processedData.length < state.data.length}
        enter="transition-opacity duration-300 ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        className="flex justify-center my-12"
      >
        <Button variant="secondary" size="lg" onClick={() => dispatch({ type: 'load-more' })}>
          Load more
        </Button>
      </Transition>
    </section>
  )
}
