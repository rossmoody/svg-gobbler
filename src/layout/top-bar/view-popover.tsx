import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment } from 'react'
import { btnBaseStyles, btnSizeStyles, btnVariantStyles } from 'src/components'
import { useCollection } from 'src/providers'
import { CollectionData } from 'src/types'

type ViewOption = {
  label: string
  value: string
}

const viewOptions: ViewOption[] = [{ label: 'Hide cors restricted', value: 'hide-cors' }]

export const ViewPopover = () => {
  const { state, dispatch } = useCollection()

  function handleCheckboxChange(e: React.MouseEvent<HTMLInputElement>) {
    const { name, checked } = e.currentTarget
    const filters = { ...state.view.filters, [name]: checked }
    chrome.storage.local.set({ view: { ...state.view, filters } })
    dispatch({ type: 'set-view', payload: { ...state.view, filters } })
    dispatch({ type: 'process-data' })
  }

  const corsRestrictedCount = state.data.filter(
    (svg) => svg.asElement instanceof HTMLImageElement,
  ).length

  return (
    <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
      <Popover className="relative inline-block px-4 text-left">
        <Popover.Button className={clsx(btnBaseStyles, btnVariantStyles.ghost, btnSizeStyles.md)}>
          View
          <ChevronDownIcon className="h-3 w-3" aria-hidden />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel
            className={clsx(
              'absolute right-0 z-10 mt-2 p-4 origin-top-left rounded-md',
              'bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black dark:ring-white',
              'dark:ring-opacity-5 ring-opacity-5 focus:outline-none',
            )}
          >
            {viewOptions.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={option.value}
                  name={option.value}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 cursor-pointer"
                  onClick={handleCheckboxChange}
                  checked={
                    state.view.filters[option.value as keyof CollectionData['view']['filters']]
                  }
                />
                <label
                  htmlFor={option.value}
                  className="ml-3 whitespace-nowrap pr-4 text-sm font-medium text cursor-pointer"
                >
                  {option.label} {corsRestrictedCount > 0 && `(${corsRestrictedCount})`}
                </label>
              </div>
            ))}
          </Popover.Panel>
        </Transition>
      </Popover>
    </Popover.Group>
  )
}
