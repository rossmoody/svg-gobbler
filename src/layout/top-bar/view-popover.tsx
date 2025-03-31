import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment } from 'react'
import { btnBaseStyles, btnSizeStyles, btnVariantStyles } from 'src/components'
import { transitions } from 'src/constants/transitions'
import { useCollection } from 'src/providers'
import { CollectionData } from 'src/types'
import { loc } from 'src/utils/i18n'
import { StorageUtils } from 'src/utils/storage-utils'

type ViewOption = {
  label: string
  value: keyof CollectionData['view']['filters']
}

const viewOptions: ViewOption[] = [
  { label: loc('topbar_hide_cors'), value: 'hide-cors' },
  { label: loc('view_always_show_size'), value: 'show-size' },
]

export const ViewPopover = () => {
  const { dispatch, state } = useCollection()

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked, name } = e.currentTarget
    const filters = { ...state.view.filters, [name]: checked }
    StorageUtils.setStorageData('view', { ...state.view, filters })
    dispatch({ payload: { ...state.view, filters }, type: 'set-view' })
    dispatch({ type: 'process-data' })
  }

  const corsRestrictedCount = state.data.filter((svg) => svg.corsRestricted).length

  return (
    <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
      <Popover className="relative inline-block px-4 text-left">
        <Popover.Button className={clsx(btnBaseStyles, btnVariantStyles.ghost, btnSizeStyles.md)}>
          {loc('topbar_view')}
          <ChevronDownIcon aria-hidden className="h-3 w-3" />
        </Popover.Button>

        <Transition as={Fragment} {...transitions.popover}>
          <Popover.Panel
            className={clsx(
              'absolute right-0 z-10 mt-2 origin-top-left rounded-md p-4',
              'bg-white shadow-2xl ring-1 ring-black dark:bg-gray-800 dark:ring-white',
              'flex flex-col gap-y-2 ring-opacity-5 focus:outline-none dark:ring-opacity-5',
            )}
          >
            {viewOptions.map((option) => (
              <div className="flex items-center" key={option.value}>
                <input
                  checked={
                    state.view.filters[option.value as keyof CollectionData['view']['filters']]
                  }
                  className="checkbox"
                  id={option.value}
                  name={option.value}
                  onChange={handleCheckboxChange}
                  type="checkbox"
                />
                <label
                  className="text ml-3 cursor-pointer whitespace-nowrap pr-4 text-sm font-medium"
                  htmlFor={option.value}
                >
                  {option.label} {option.value === 'hide-cors' && `(${corsRestrictedCount})`}
                </label>
              </div>
            ))}
          </Popover.Panel>
        </Transition>
      </Popover>
    </Popover.Group>
  )
}
