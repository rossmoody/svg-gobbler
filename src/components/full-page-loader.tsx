import { Transition } from '@headlessui/react'

import { Logo } from './logo'

export const FullPageLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Transition
        appear
        as="div"
        enter="transition-all duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        show
      >
        <Logo className="h-10 w-10 animate-bounce" />
      </Transition>
    </div>
  )
}
