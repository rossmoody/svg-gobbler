import { Transition } from '@headlessui/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { loc } from 'src/utils/i18n'

/**
 * The empty state used when there are no results to show based on the current
 * filter, search, and view settings.
 */
export const NoResults = () => (
  <Transition
    appear
    as={Fragment}
    enter="transition-all duration-300 ease-in-out"
    enterFrom="opacity-0 scale-95"
    enterTo="opacity-100 scale-100"
    show
  >
    <div className="flex h-full w-full items-center justify-center rounded-3xl bg-white/70 p-12 dark:bg-gray-800/70">
      <div className="text-center">
        <MagnifyingGlassIcon aria-hidden={true} className="mx-auto mb-3 h-12 w-12" />
        <h3 className="mb-2 mt-2 text-lg font-semibold">{loc('no_results_title')}</h3>
        <p className="text-muted mt-1 text-sm">{loc('no_results_desc')}</p>
      </div>
    </div>
  </Transition>
)
