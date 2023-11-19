import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment } from 'react'
import { btnBaseStyles, btnSizeStyles, btnVariantStyles } from 'src/components'
import { useCollection } from 'src/providers'
import { CollectionData } from 'src/types'
import { StorageUtils } from 'src/utils/storage-utils'

type ViewOption = {
  label: string
  value: string
}

const viewOptions: ViewOption[] = [{ label: 'Hide cors restricted', value: 'hide-cors' }]

export const ViewPopover = () => {
  const { state, dispatch } = useCollection()

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.currentTarget
    const filters = { ...state.view.filters, [name]: checked }
    StorageUtils.setStorageData('view', { ...state.view, filters })
    dispatch({ type: 'set-view', payload: { ...state.view, filters } })
    dispatch({ type: 'process-data' })
  }

  const corsRestrictedCount = state.data.filter((svg) => svg.corsRestricted).length

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
              'absolute right-0 z-10 mt-2 origin-top-left rounded-md p-4',
              'bg-white shadow-2xl ring-1 ring-black dark:bg-gray-800 dark:ring-white',
              'ring-opacity-5 focus:outline-none dark:ring-opacity-5',
            )}
          >
            {viewOptions.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={option.value}
                  name={option.value}
                  type="checkbox"
                  className="checkbox"
                  onChange={handleCheckboxChange}
                  checked={
                    state.view.filters[option.value as keyof CollectionData['view']['filters']]
                  }
                />
                <label
                  htmlFor={option.value}
                  className="text ml-3 cursor-pointer whitespace-nowrap pr-4 text-sm font-medium"
                >
                  {option.label} ({corsRestrictedCount})
                </label>
              </div>
            ))}
          </Popover.Panel>
        </Transition>
      </Popover>
    </Popover.Group>
  )
}
