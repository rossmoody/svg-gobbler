import { Transition } from '@headlessui/react'
import { Logo } from './logo'

export const FullPageLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Transition
        appear
        show
        as="div"
        enter="transition-all duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <Logo className="rotate-full h-8 w-8" />
      </Transition>
    </div>
  )
}
