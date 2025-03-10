import { Transition } from '@headlessui/react'
import { Provider as ToastProvider, Viewport } from '@radix-ui/react-toast'
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip'
import { Fragment } from 'react'
import { DetailsLayout } from 'src/layout/details'
import { DetailsProvider, UserProvider } from 'src/providers'

export const DetailsRoute = () => {
  return (
    <ToastProvider>
      <TooltipProvider delayDuration={100}>
        <UserProvider>
          <DetailsProvider>
            <Transition
              appear
              as={Fragment}
              enter="transition-all duration-500 ease-in-out"
              enterFrom="opacity-0 scale-97"
              enterTo="opacity-100 scale-100"
              show
            >
              <DetailsLayout />
            </Transition>
          </DetailsProvider>
        </UserProvider>
      </TooltipProvider>
      <Viewport className="toast-viewport" />
    </ToastProvider>
  )
}
