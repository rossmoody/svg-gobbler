import { Transition } from '@headlessui/react'
import _ from 'lodash'
import { Fragment, useEffect, useMemo } from 'react'
import { Button } from 'src/components'
import { NoResults } from 'src/components/no-results'
import { useCollection } from 'src/providers'
import type { CollectionData } from 'src/types'
import { logger } from 'src/utils/logger'
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

  useEffect(() => {
    // Dev Logs
    logger.table(
      _.chain(data)
        .map((obj) => _.pick(obj, ['originalString']))
        .value(),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <Card data={svg} style={{ transitionDelay: calculateDelay(i) }} />
          </Transition>
        ))}
      </ul>
      <Transition
        show={state.processedData.length < filteredResultLength}
        enter="transition-opacity duration-300 ease-in-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        className="my-12 flex justify-center"
      >
        <Button variant="secondary" size="lg" onClick={() => dispatch({ type: 'load-more' })}>
          Load more
        </Button>
      </Transition>
    </section>
  )
}
