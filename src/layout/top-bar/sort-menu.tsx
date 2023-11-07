import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment } from 'react'
import { btnBaseStyles, btnSizeStyles, btnVariantStyles } from 'src/components'
import { useCollection } from 'src/providers'
import { CollectionState } from 'src/providers/collection/reducer'

type SortOption = {
  label: string
  value: CollectionState['view']['sort']
}

const sortOptions: SortOption[] = [
  { label: 'None', value: 'none' },
  { label: 'File size: low to high', value: 'file-asc' },
  { label: 'File size: high to low', value: 'file-desc' },
]

export const SortMenu = () => {
  const { state, dispatch } = useCollection()

  function handleSortChange(value: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const sort = value.currentTarget.dataset.value as SortOption['value']
    chrome.storage.local.set({ view: { ...state.view, sort } })
    dispatch({ type: 'set-view', payload: { ...state.view, sort } })
    dispatch({ type: 'process-data' })
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className={clsx(btnBaseStyles, btnVariantStyles.ghost, btnSizeStyles.md)}>
        Sort
        <ChevronDownIcon className="h-3 w-3" aria-hidden />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={clsx(
            'absolute right-0 z-10 mt-2 w-48 origin-top-left rounded-md',
            'bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black dark:ring-white',
            'dark:ring-opacity-5 ring-opacity-5 focus',
          )}
        >
          <div className="py-1">
            {sortOptions.map((option) => (
              <Menu.Item key={option.value}>
                {({ active }) => (
                  <span
                    data-value={option.value}
                    onClick={handleSortChange}
                    className={clsx(
                      state.view.sort === option.value && 'font-semibold',
                      active && 'bg-gray-100 dark:bg-gray-700',
                      'block px-4 py-2 text-sm cursor-pointer',
                    )}
                  >
                    {option.label}
                  </span>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
