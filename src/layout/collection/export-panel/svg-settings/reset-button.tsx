import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment } from 'react'
import { SvgoPlugin, defaultSvgoPlugins } from 'src/constants/svgo-plugins'
import { useExport } from 'src/providers'
import { StorageUtils } from 'src/utils/storage-utils'

export const ResetButton = () => {
  const { state, dispatch } = useExport()

  const resetToDefault = async () => {
    const plugins = (await StorageUtils.getStorageData<SvgoPlugin[]>('plugins')) ?? []
    dispatch({ type: 'set-svgo-plugins', payload: plugins })
  }

  const resetToEmpty = () => {
    dispatch({ type: 'set-svgo-plugins', payload: [] })
  }

  const resetToSvgoDefault = () => {
    dispatch({ type: 'set-svgo-plugins', payload: defaultSvgoPlugins })
  }

  const setAsDefault = async () => {
    StorageUtils.setStorageData('plugins', state.settings.svg.svgoPlugins)
  }

  const menuItem = [
    { label: 'Default settings', onClick: resetToDefault },
    { label: 'SVGO default', onClick: resetToSvgoDefault },
    { label: 'Deselect all', onClick: resetToEmpty },
  ]

  return (
    <Fragment>
      <Menu>
        <Menu.Button className="flex items-center gap-1">
          Apply <ChevronDownIcon className="h-4 w-4" />
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
              'absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md',
              'bg-white shadow-2xl ring-1 ring-black dark:bg-gray-800 dark:ring-white',
              'focus ring-opacity-5 dark:ring-opacity-5',
            )}
          >
            <div className="py-1">
              {menuItem.map((item) => (
                <Menu.Item key={item.label}>
                  {({ active }) => (
                    <span
                      onClick={item.onClick}
                      className={clsx('block cursor-pointer px-3 py-1.5 text-xs', {
                        'bg-gray-100 dark:bg-gray-700': active,
                      })}
                    >
                      {item.label}
                    </span>
                  )}
                </Menu.Item>
              ))}
              <div className="my-2 border-t border-gray-100 dark:border-gray-700" />
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={setAsDefault}
                    className={clsx('block cursor-pointer px-3 py-1.5 text-xs', {
                      'bg-gray-100 dark:bg-gray-700': active,
                    })}
                  >
                    Set as default
                  </span>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </Fragment>
  )
}
