import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment } from 'react'
import { Badge, btnBaseStyles, btnSizeStyles, btnVariantStyles } from 'src/components'
import { transitions } from 'src/constants/transitions'
import { useCollection, UserState, useUser } from 'src/providers'
import { CollectionData } from 'src/types'
import { loc } from 'src/utilities/i18n'
import { StorageUtilities } from 'src/utilities/storage-utilities'

import { ViewNameFeatureNotice } from './view-name-feature-notice'

type ViewOption = {
  label: string
  value: ViewOptionValue
}

type ViewOptionValue = keyof CollectionData['view']['filters']

const viewOptions: ViewOption[] = [
  { label: loc('view_always_show_size'), value: 'show-size' },
  { label: loc('view_show_name'), value: 'show-name' },
  { label: loc('topbar_hide_cors'), value: 'hide-cors' },
]

export const ViewPopover = () => {
  const { dispatch, state } = useCollection()
  const { dispatch: userDispatch, state: userState } = useUser()

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked, name } = event.currentTarget
    const filters = { ...state.view.filters, [name]: checked }
    StorageUtilities.setStorageData('view', { ...state.view, filters })
    dispatch({ payload: { ...state.view, filters }, type: 'set-view' })
    dispatch({ type: 'process-data' })
  }

  function handleViewNameFeatureNoticeClick() {
    if (!userState.features.viewedNameFeature) {
      const user: UserState = {
        ...userState,
        features: { ...userState.features, viewedNameFeature: true },
      }

      userDispatch({
        payload: user,
        type: 'set-user',
      })

      StorageUtilities.setStorageData('user', user)
    }
  }

  const corsRestrictedCount = state.data.filter((svg) => svg.corsRestricted).length

  return (
    <Popover.Group className="-mx-4 flex items-center divide-x divide-gray-200">
      <Popover className="relative inline-block px-4 text-left">
        <Popover.Button
          className={clsx(btnBaseStyles, btnVariantStyles.ghost, btnSizeStyles.md)}
          onClick={handleViewNameFeatureNoticeClick}
        >
          {loc('topbar_view')}
          <ViewNameFeatureNotice />
          <ChevronDownIcon aria-hidden className="h-3 w-3" />
        </Popover.Button>

        <Transition as={Fragment} {...transitions.popover}>
          <Popover.Panel
            className={clsx(
              'absolute right-0 z-50 mt-2 origin-top-left rounded-md p-5',
              'bg-white shadow-2xl ring-1 ring-black dark:bg-gray-800 dark:ring-white',
              'flex flex-col gap-y-3 ring-opacity-5 focus:outline-none dark:ring-opacity-5',
            )}
          >
            {viewOptions.map((option) => (
              <div className="flex items-center" key={option.value}>
                <input
                  checked={state.view.filters[option.value]}
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
                  {option.label}
                  {option.value === 'hide-cors' && (
                    <Badge className="ml-2" text={`${corsRestrictedCount}`} />
                  )}
                </label>
              </div>
            ))}
          </Popover.Panel>
        </Transition>
      </Popover>
    </Popover.Group>
  )
}
