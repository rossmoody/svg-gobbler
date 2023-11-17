import { Transition } from '@headlessui/react'
import { Fragment, Suspense } from 'react'
import { DetailsLayout } from 'src/layout/details'
import { DetailsProvider } from 'src/providers'

export const DetailsRoute = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsProvider>
        <Transition
          show
          appear
          as={Fragment}
          enter="transition-all duration-500 ease-in-out"
          enterFrom="opacity-0 scale-97"
          enterTo="opacity-100 scale-100"
        >
          <DetailsLayout />
        </Transition>
      </DetailsProvider>
    </Suspense>
  )
}
