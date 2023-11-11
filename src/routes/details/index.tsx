import { Transition } from '@headlessui/react'
import { Fragment, Suspense } from 'react'
import { DetailsLayout } from 'src/layout/details'
import { DetailsProvider } from 'src/providers/details'

export const DetailsRoute = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsProvider>
        <Transition
          show
          appear
          as={Fragment}
          enter="transition-opacity duration-500 ease-in-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500 ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DetailsLayout />
        </Transition>
      </DetailsProvider>
    </Suspense>
  )
}
