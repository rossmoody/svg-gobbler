import type { CollectionData } from 'src/types'

import { Transition } from '@headlessui/react'
import { useEffect } from 'react'
import { FeedbackModal, ReviewPrompt } from 'src/components'
import { NoResults } from 'src/components/no-results'
import { useIntersectionObserver } from 'src/hooks'
import { useCollection } from 'src/providers'
import { SvgType } from 'src/scripts'

import { Card } from './card'
import { SvgName } from './card/svg-name'
import { ShowPasteCue } from './show-paste-cue'

export const Collection = ({ data }: Pick<CollectionData, 'data'>) => {
  const { dispatch, state } = useCollection()

  const { elementRef, isIntersecting } = useIntersectionObserver()

  useEffect(() => {
    if (isIntersecting) {
      dispatch({ type: 'load-more' })
    }
  }, [isIntersecting, dispatch])

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
            as="li"
            enter="transition-all duration-300 ease-in-out"
            enterFrom="opacity-0 scale-90"
            enterTo="opacity-100 scale-100"
            key={svg.svg + i}
            show
            className="rounded-xl transition-all duration-300 ease-in-out hover:shadow-md"
            style={{ backgroundColor: state.view.canvas }}
          >
            <Card data={svg as SvgType} />
            <SvgName data={svg as SvgType} />
          </Transition>
        ))}
        {/* Intersection observer */}
        <li ref={elementRef as React.RefObject<HTMLLIElement>} />
      </ul>

      <ReviewPrompt />
      <FeedbackModal />
      <ShowPasteCue />
    </section>
  )
}
