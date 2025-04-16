import type { CollectionData } from 'src/types'

import { Transition } from '@headlessui/react'
import { useEffect } from 'react'
import { FeedbackModal, ReviewPrompt } from 'src/components'
import { NoResults } from 'src/components/no-results'
import { useCollection } from 'src/providers'
import { SvgType } from 'src/scripts'

import { Card } from './card'
import { SvgName } from './card/svg-name'
import { CollectionDropZone } from './collection-drop-zone'
import { InfiniteScroll } from './infinite-scroll'
import { ShowPasteCue } from './show-paste-cue'

export const Collection = ({ data }: Pick<CollectionData, 'data'>) => {
  const { dispatch, state } = useCollection()

  /**
   * We do this here instead of routes because data is awaited in
   * Suspense within the route component.
   */
  useEffect(() => {
    dispatch({ payload: data, type: 'set-data' })
    dispatch({ type: 'process-data' })
    return () => dispatch({ type: 'reset' })
  }, [data, dispatch])

  function generateMinSize() {
    switch (state.view.size) {
      case 96: {
        return '10rem'
      }
      case 128: {
        return '12.5rem'
      }
      case 192: {
        return '15rem'
      }
      case 256: {
        return '17.5rem'
      }
      default: {
        return '8.75rem'
      }
    }
  }

  if (state.processedData.length === 0) {
    return <NoResults />
  }

  return (
    <CollectionDropZone>
      <section className="border-gray-200 transition-colors dark:border-gray-800">
        <ul
          className="grid justify-between gap-4"
          style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${generateMinSize()}, 1fr))` }}
        >
          {state.processedData.map((svg, index) => (
            <Transition
              appear
              as="li"
              className="rounded-xl transition-all duration-300 ease-in-out hover:shadow-md"
              enter="transition-all duration-300 ease-in-out"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              key={svg.svg + index}
              show
              style={{ backgroundColor: state.view.canvas }}
            >
              <Card data={svg as SvgType} />
              <SvgName data={svg as SvgType} />
            </Transition>
          ))}
          <InfiniteScroll />
        </ul>

        <ReviewPrompt />
        <FeedbackModal />
        <ShowPasteCue />
      </section>
    </CollectionDropZone>
  )
}
