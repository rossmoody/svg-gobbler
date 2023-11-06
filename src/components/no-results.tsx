import { Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'

/**
 * The empty state used when there are no results to show based on the current
 * filter, search, and view settings.
 */
export const NoResults = () => (
  <Transition
    show
    appear
    as={Fragment}
    enter="transition-all duration-300 ease-in-out"
    enterFrom="opacity-0 scale-95"
    enterTo="opacity-100 scale-100"
  >
    <div className="flex items-center justify-center w-full h-full rounded-3xl p-12 bg-white/70 dark:bg-gray-800/70">
      <div className="text-center">
        <MagnifyingGlassIcon className="mx-auto h-12 w-12 mb-3" aria-hidden={true} />
        <h3 className="mt-2 text-lg font-semibold mb-2">No SVGs to show</h3>
        <p className="mt-1 text-sm text-muted">
          Try changing your filter, search, or view settings to display SVGs
        </p>
      </div>
    </div>
  </Transition>
)
